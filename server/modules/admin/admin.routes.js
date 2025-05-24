import express from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import adminControllers from "./admin.controllers.js";

const router = express.Router();

router.post("/createService", verifyToken, adminControllers.createService);
router.get("/services", adminControllers.getAllServices);
router.put("/enabledService/:id", verifyToken, adminControllers.enabledService)





export default router;