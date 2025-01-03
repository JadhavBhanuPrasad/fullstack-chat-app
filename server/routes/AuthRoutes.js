import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { signup, login, getUserInfo, updateProfile, addImage , deleteImage, logout} from "../controllers/AuthController.js";
import multer from 'multer'

const authRoutes = Router ()
const upload = multer({ dest: "uploads/profiles" });

authRoutes.post('/signup',signup);
authRoutes.post('/login',login);
authRoutes.get('/user-info',verifyToken,getUserInfo)
authRoutes.post('/update-profile',verifyToken,updateProfile)
authRoutes.post('/add-profile-image',verifyToken,upload.single("profile-image"),addImage)
authRoutes.delete('/delete-profile-image',verifyToken,deleteImage)
authRoutes.post('/logout',logout)
export default authRoutes;