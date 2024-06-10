import { type NextFunction, type Request, type Response } from "express";
import authService from "$server/services/auth.service.js";
import type { PublicUser } from "$server/types.js";

const createAuthMiddlewareFn = (predicate: (user: PublicUser) => boolean) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization;

    if (!authToken) {
      res.status(403).end();
      return;
    }

    const user = authService.getUserFromToken(authToken);

    if (!user || !predicate(user)) {
      res.status(403).end();
      return;
    }

    res.locals.user = user;
    next();
  };
};

const requireModOrMore = createAuthMiddlewareFn(({ role }) => {
  return role === "MODERATOR" || role === "ADMIN";
});

const requireAdmin = createAuthMiddlewareFn(({ role }) => {
  return role === "ADMIN";
});

export default {
  requireModOrMore,
  requireAdmin
};