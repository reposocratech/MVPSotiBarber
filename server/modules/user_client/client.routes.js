import express from "express";
import clientControllers from "./client.controllers.js";
import { validateRegister } from "../../middleware/validateRegister.js";
import { registerSchema } from "../../schemas/registerSchema.js";

const router = express.Router();

router.post("/register", validateRegister(registerSchema), clientControllers.register);

export default router;