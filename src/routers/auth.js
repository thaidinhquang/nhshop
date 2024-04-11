import express from "express";
import { deleteUser, getAllUser, signin, signup } from "../controllers/auth";
const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.get("/auth/user", getAllUser);
router.delete("/auth/user/:id", deleteUser);
export default router;
