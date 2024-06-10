import { Router } from "express";
import authController from "$server/controllers/auth.controller.js";
import apiController from "$server/controllers/api.controller.js";
import authMiddleware from "$server/middleware/auth.middleware.js";

const router = Router();

router.post("/entry", apiController.addEntry);
router.route("/entry/:id")
  .get(apiController.getEntryById)
  .put(authMiddleware.requireModOrMore, apiController.updateEntry)
  .delete(authMiddleware.requireAdmin, apiController.deleteEntry);
router.get("/entries/:word", apiController.getEntriesByWord);
router.get("/random-entry-word", apiController.getRandomEntryWord);
router.get("/words", apiController.getWords);

router.post("/auth/sign-up", authController.signUp);
router.post("/auth/log-in", authController.logIn);
router.get("/auth/get-credentials", authController.getCredentials);

export default router;