import express from "express";
import multer from "multer";
let upload = multer();
import { isAuthenticated } from "../middlewares/authentication.js";
import { login, register } from "../controllers/authController.js";
import { createList, returnLists } from "../controllers/listController.js";
const router = express.Router();

router.post("/addList", isAuthenticated, upload.none(), createList);
router.get("/list", isAuthenticated, returnLists);
router.delete("/list", isAuthenticated, returnLists);
router.put("/list", isAuthenticated, returnLists);
export default router;
