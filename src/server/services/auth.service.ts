import jwt from "jsonwebtoken";
import type { PublicUser } from "$server/types.js";

const isPublicUser = (arg: unknown): arg is PublicUser => {
  return typeof arg === "object"
    && arg !== null
    && "email" in arg
    && "role" in arg;
};

const createToken = ({ email, role }: PublicUser) => {
  return jwt.sign({ email, role }, process.env.JWT_SECRET);
};

const getUserFromToken = (token: string) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  if (!isPublicUser(payload))
    return null;
  return {
    email: payload.email,
    role: payload.role
  };
};

export default {
  createToken,
  getUserFromToken
};