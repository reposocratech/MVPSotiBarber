import express from "express";
import clientControllers from "./client.controllers.js";
import { validateForms } from "../../middleware/validateForms.js"
import { registerSchema } from "../../schemas/registerSchema.js";
import { loginSchema } from "../../schemas/loginSchema.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import { forgetPasswordSchema } from "../../schemas/forgetPasswordSchema.js";
import { uploadImage } from "../../middleware/multer.js";
import { changePasswordSchema } from "../../schemas/changePasswordSchema.js";
import { completeRegisterSchema } from "../../schemas/completeRegisterSchema.js";
/* import { validateChangePassword } from "../../middleware/validateChangePassword.js";
import { changePasswordSchema } from "../../schemas/changePasswordSchema.js"; */

const router = express.Router();

router.post("/register", validateForms(registerSchema), clientControllers.register);
router.post("/login", validateForms(loginSchema), clientControllers.login);
router.get("/userById", verifyToken, clientControllers.userById)
router.post("/forgetPassword", validateForms(forgetPasswordSchema), clientControllers.forgetPassword)
router.put("/passRecovery", validateForms(changePasswordSchema), clientControllers.passRecovery)
router.put("/confirmAccount", clientControllers.confirmAccount)
router.put("/completeFormRegister", validateForms(completeRegisterSchema), clientControllers.completeFormRegister)
router.post('/contact', clientControllers.contactForm);
router.put('/editClient',verifyToken, uploadImage("users"), clientControllers.editClient)
router.get("/appointments/:id", verifyToken, clientControllers.getAppointmentsByClientId);

export default router;