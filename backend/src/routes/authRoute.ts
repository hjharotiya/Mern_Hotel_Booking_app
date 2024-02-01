import express from "express";
import { check } from "express-validator";
import {
  logoutController,
  userloginController,
} from "../controller/userController";
import { validateTokenController } from "../controller/validateTokenController";
import verifyToken from "../middleware/authMiddlewear";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "email is required").isEmail(),
    check(
      "password",
      "password with more than 6 or more charcter is required"
    ).isLength({
      min: 6,
    }),
  ],
  userloginController
);

router.get("/validate-token", verifyToken, validateTokenController);

router.post("/logout", logoutController);

export default router;
