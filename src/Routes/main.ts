import { Router } from "express";
import * as controller from "../Controllers/home";

const router = Router();
router.get("/", controller.default);

export default router;