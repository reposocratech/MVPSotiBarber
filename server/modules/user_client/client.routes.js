import express from "express";
import clientControllers from "./client.controllers.js";
import { validateRegister } from "../../middleware/validateRegister.js";
import { validateLogin } from "../../middleware/validateLogin.js";
import { registerSchema } from "../../schemas/registerSchema.js";
import { loginSchema } from "../../schemas/loginSchema.js";
import { verifyToken } from "../../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", validateRegister(registerSchema), clientControllers.register);
router.post("/login", validateLogin(loginSchema), clientControllers.login);
router.get("/userById", verifyToken, clientControllers.userById)
router.post("/forgetPassword", clientControllers.forgetPassword)
router.put("/confirmAccount", clientControllers.confirmAccount)

export default router;