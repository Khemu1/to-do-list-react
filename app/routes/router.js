import express from "express";
import multer from "multer";
let upload = multer();
import { isAuthenticated, logout } from "../middlewares/authentication.js";
import { login, register } from "../controllers/authController.js";
import { createList, returnLists } from "../controllers/listController.js";
import {
  validateLogin,
  validateRegister,
} from "../middlewares/dataValidation.js";
import { getUserData } from "../controllers/getUserData.js";
import bodyParser from "body-parser";

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/login", validateLogin, login);
router.get("/userData", isAuthenticated, getUserData);
router.get("/logout", logout);
router.post("/register", validateRegister, register);
router.post("/addList/:id", isAuthenticated, createList);
router.get("/lists", isAuthenticated, returnLists);
router.delete("/list", isAuthenticated, returnLists);
router.put("/list", isAuthenticated, returnLists);
export default router;
