import express from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import adminControllers from "./admin.controllers.js";
import { uploadImage } from "../../middleware/multer.js";
import { validateForms } from "../../middleware/validateForms.js";
import { createServiceSchema } from "../../schemas/createServiceSchema.js";

const router = express.Router();

router.post("/createService",validateForms(createServiceSchema), verifyToken, adminControllers.createService);
router.get("/services", adminControllers.getAllServices);
router.put("/enabledService/:id", verifyToken, adminControllers.enabledService)
router.put("/editService", verifyToken, adminControllers.editService)
router.post("/createEmployee", uploadImage("employee"), adminControllers.createEmployee)
router.put("/editEmployee", verifyToken, adminControllers.editEmployee)






export default router;