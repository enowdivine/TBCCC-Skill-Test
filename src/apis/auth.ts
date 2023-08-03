import express from "express";
import Authentication from "../controllers/auth";

const router = express.Router();
const authController = new Authentication();

router.post("/register", authController.register);
router.post("/login", authController.login);

export default router;
