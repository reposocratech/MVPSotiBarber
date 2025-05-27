import express from "express";
import employeeControllers from "./employee.controllers.js"; 
import { verifyToken } from "../../middleware/verifyToken.js";

const router = express.Router();

router.get("/clientList", verifyToken, employeeControllers.getAllClients);
router.get("/clientProfile/:id", verifyToken, employeeControllers.getClientByEmployee);

export default router;