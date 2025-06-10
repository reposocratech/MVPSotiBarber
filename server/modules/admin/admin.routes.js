import express from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import adminControllers from "./admin.controllers.js";
import { uploadImage } from "../../middleware/multer.js";
import { validateForms } from "../../middleware/validateForms.js";
import { createServiceSchema } from "../../schemas/createServiceSchema.js";
import { createEmployeeSchema } from "../../schemas/createEmployeeSchema.js";
import { editEmployeeSchema } from "../../schemas/editEmployeeSchema.js";
import { editAppointmentSchema } from "../../schemas/editAppointmentSchema.js";
import { createAppointmentSchema } from "../../schemas/createAppointmentSchema.js";
import { uploadImageMulti } from "../../middleware/multerMultiple.js";

const router = express.Router();

router.post("/createService", uploadImage("service"), validateForms(createServiceSchema), verifyToken, adminControllers.createService);
router.get("/services", adminControllers.getAllServices);
router.put("/enabledService/:id", verifyToken, adminControllers.enabledService)
router.put("/editService", verifyToken, uploadImage("service"), adminControllers.editService)
router.get("/employeeList", verifyToken,adminControllers.getAllEmployees);
router.put("/enabledEmployee/:id", verifyToken, adminControllers.enabledEmployee)
router.post("/createEmployee",verifyToken, uploadImage("users"), validateForms(createEmployeeSchema), adminControllers.createEmployee)
router.put("/editEmployee", uploadImage("users"), validateForms(editEmployeeSchema), verifyToken, adminControllers.editEmployee)
router.post("/createAppointment",verifyToken, validateForms(createAppointmentSchema), adminControllers.createAppointment)
router.put("/deleteService", verifyToken, adminControllers.deleteService);
router.get("/clientListAppointment", verifyToken, adminControllers.clientListAppointment)
router.get("/clientList", adminControllers.getAllClients);
router.put("/enabledClient/:id", verifyToken, adminControllers.enabledClient)
router.get("/clientListSearch", verifyToken, adminControllers.clientListAppointment)
router.get("/getOneService/:id", verifyToken, adminControllers.getOneService);
router.get("/getAllAppointments", verifyToken,adminControllers.getAllAppointments);
router.get("/getOneAppointment/:id", verifyToken, adminControllers.getOneAppointment);
router.put("/editAppointment", verifyToken, validateForms(editAppointmentSchema), adminControllers.editAppointment);
router.put("/cancelAppointment", verifyToken, adminControllers.cancelAppointment);
router.post("/addImages", verifyToken, uploadImageMulti('servicesImages'), adminControllers.addImages)
router.get("/getImages/:id", verifyToken, adminControllers.getImages)
router.delete("/delImage/:service_id/:image_id/:file_name", verifyToken, adminControllers.delImage)
router.post("/reorderServiceImages", verifyToken, adminControllers.reorderServiceImages)



export default router;