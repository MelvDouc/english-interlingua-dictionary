import { Router } from "express";
import authController from "$server/controllers/auth.controller.js";
import apiController from "$server/controllers/api.controller.js";

const router = Router();

router.post("/entry", apiController.addEntry);
router.route("/entry/:id")
  .get(apiController.getEntryById)
  .put(apiController.updateEntry)
  .delete(apiController.deleteEntry);
router.get("/next-entry/:word", apiController.getNextEntryByWord);
router.get("/entries/:word", apiController.getEntriesByWord);
router.get("/random-entry-word", apiController.getRandomEntryWord);
router.get("/words", apiController.getWords);

router.post("/auth/sign-up", authController.signUp);
router.post("/auth/log-in", authController.logIn);
router.get("/auth/check-log-in", authController.checkLogIn);
router.delete("/auth/log-out", authController.logOut);

export default router;