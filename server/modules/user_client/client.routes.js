import express from "express";
import clientControllers from "./client.controllers.js";
import { validateRegister } from "../../middleware/validateRegister.js";
import { registerSchema } from "../../schemas/registerSchema.js";
import { verifyToken } from "../../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", validateRegister(registerSchema), clientControllers.register);
router.post("/login", clientControllers.login);
router.get("/userById", verifyToken, clientControllers.userById)

export default router;