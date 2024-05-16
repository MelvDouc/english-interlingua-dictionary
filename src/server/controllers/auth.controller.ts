import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "$server/models/user.model.js";
import type { PublicUser } from "$server/types.js";

const AUTH_TOKEN_KEY = "auth_token";

const isPublicUser = (arg: unknown): arg is PublicUser => {
  return typeof arg === "object"
    && arg !== null
    && "email" in arg
    && "role" in arg;
};

const signUp = async (req: Request, res: Response) => {
  const data = req.body;
  const insertResult = await userModel.createUser(data);
  res.json(insertResult);
};

const logIn = async (req: Request, res: Response) => {
  const data = req.body;
  const user = await userModel.checkCredentials(data);

  if (!user) {
    res.json({ error: "Invalid credentials." });
    return;
  }

  const token = jwt.sign(user, process.env.JWT_SECRET);
  res.cookie(AUTH_TOKEN_KEY, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 365 * 24 * 60 * 60 * 1000
  });
  res.json({ error: null });
};

const checkLogIn = (req: Request, res: Response) => {
  const token = req.cookies[AUTH_TOKEN_KEY];

  if (!token) {
    res.json(null);
    return;
  }

  const data = jwt.verify(token, process.env.JWT_SECRET);

  if (isPublicUser(data)) {
    res.json({ email: data.email, role: data.role });
    return;
  }

  res.json(null);
};

const logOut = (_req: Request, res: Response) => {
  res.cookie(AUTH_TOKEN_KEY, null, { maxAge: 0 });
  res.json(null);
};

export default {
  signUp,
  logIn,
  checkLogIn,
  logOut
};