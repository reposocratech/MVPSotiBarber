import express from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import adminControllers from "./admin.controllers.js";
import { uploadImage } from "../../middleware/multer.js";
import { validateForms } from "../../middleware/validateForms.js";
import { createServiceSchema } from "../../schemas/createServiceSchema.js";
import { createEmployeeSchema } from "../../schemas/createEmployeeSchema.js";
import { editEmployeeSchema } from "../../schemas/editEmployeeSchema.js";

const router = express.Router();

router.post("/createService",uploadImage("service"), validateForms(createServiceSchema), verifyToken, adminControllers.createService);
router.get("/services", adminControllers.getAllServices);
router.put("/enabledService/:id", verifyToken, adminControllers.enabledService)
router.put("/editService", verifyToken, uploadImage("service"), adminControllers.editService)
router.get("/employeeList", verifyToken,adminControllers.getAllEmployees);
router.put("/enabledEmployee/:id", verifyToken, adminControllers.enabledEmployee)
router.post("/createEmployee", uploadImage("employee"), validateForms(createEmployeeSchema), verifyToken, adminControllers.createEmployee)
router.put("/editEmployee", uploadImage("employee"), validateForms(editEmployeeSchema), verifyToken, adminControllers.editEmployee)
router.post("/createAppointment",verifyToken, adminControllers.createAppointment)
router.put("/deleteService", verifyToken, adminControllers.deleteService);
router.get("/clientListAppointment", verifyToken, adminControllers.clientListAppointment)
router.get("/clientList", adminControllers.getAllClients);
router.put("/enabledClient/:id", verifyToken, adminControllers.enabledClient)
router.get("/clientListSearch", verifyToken, adminControllers.clientListAppointment)
router.get("/getOneService/:id", verifyToken, adminControllers.getOneService);
router.get("/getAllAppointments", verifyToken,adminControllers.getAllAppointments);
router.get("/getOneAppointment/:id", verifyToken, adminControllers.getOneAppointment);
router.put("/editAppointment", verifyToken, adminControllers.editAppointment);
router.put("/cancelAppointment", verifyToken, adminControllers.cancelAppointment);










export default router;