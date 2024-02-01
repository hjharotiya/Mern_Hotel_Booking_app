import express from "express";
import { registerUserController } from "../controller/userController";
import { check } from "express-validator";
import { isString } from "util";

const router = express.Router();

router.post(
  "/register",
  [
    check("firstName", "Frist name is required").isString(),
    check("lastName", "Last name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "password with more than 6 words required").isLength({
      min: 6,
    }),
  ],
  registerUserController
);

export default router;
