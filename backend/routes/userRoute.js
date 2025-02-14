import express from "express";
import { deleteUser, getAllUsers, getUserDetails, signIn, signOut, signUp, updateUser } from "../controllers/userControlller.js";
import { isAuthenticatedUser } from "../middleware/authUser.js";

const router = express.Router()

router.post('/register', signUp)
router.post('/login', signIn)
router.post('/logout', signOut)  
router.get('/me/:userId', isAuthenticatedUser, getUserDetails)
router.get('/users',  isAuthenticatedUser, getAllUsers )
router.put('/user/:userId/update',  isAuthenticatedUser,  updateUser )
router.delete('/user/:userId',  isAuthenticatedUser, deleteUser )


export default router;