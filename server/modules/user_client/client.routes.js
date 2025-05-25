import express from "express";
import clientControllers from "./client.controllers.js";
import { validateRegister } from "../../middleware/validateRegister.js";
import { validateLogin } from "../../middleware/validateLogin.js";
import { registerSchema } from "../../schemas/registerSchema.js";
import { loginSchema } from "../../schemas/loginSchema.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import { validateForgetPassword } from "../../middleware/validateForgetPassword.js";
import { forgetPasswordSchema } from "../../schemas/forgetPasswordSchema.js";
import { uploadImage } from "../../middleware/multer.js";
/* import { validateChangePassword } from "../../middleware/validateChangePassword.js";
import { changePasswordSchema } from "../../schemas/changePasswordSchema.js"; */

const router = express.Router();

router.post("/register", validateRegister(registerSchema), clientControllers.register);
router.post("/login", validateLogin(loginSchema), clientControllers.login);
router.get("/userById", verifyToken, clientControllers.userById)
router.post("/forgetPassword", validateForgetPassword(forgetPasswordSchema), clientControllers.forgetPassword)
router.put("/passRecovery", /* validateChangePassword(changePasswordSchema), */ clientControllers.passRecovery)
router.put("/confirmAccount", clientControllers.confirmAccount)
router.put("/completeFormRegister", clientControllers.completeFormRegister)
router.post('/contact', clientControllers.contactForm);
router.put('/editClient',verifyToken, uploadImage("users"), clientControllers.editClient)


export default router;