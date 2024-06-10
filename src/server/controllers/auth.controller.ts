import { type Request, type Response } from "express";
import userModel from "$server/models/user.model.js";
import authService from "$server/services/auth.service.js";

const signUp = async (req: Request, res: Response) => {
  const data = req.body;
  const insertResult = await userModel.createUser(data);
  res.json(insertResult);
};

const logIn = async (req: Request, res: Response) => {
  const data = req.body;
  const user = await userModel.checkCredentials(data);

  if (!user) {
    res.json(null);
    return;
  }

  res.json(authService.createToken(user));
};

const getCredentials = async (req: Request, res: Response) => {
  const token = req.headers.authorization;

  if (!token) {
    res.json(null);
    return;
  }

  const credentials = authService.getUserFromToken(token);
  res.json(credentials);
};

export default {
  signUp,
  logIn,
  getCredentials
};