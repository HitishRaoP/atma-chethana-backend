import express from 'express';

const router = express.Router();

import { signup, login, logout, checkAuthorisation, getUserData } from '../controllers/authControllers.js'

import { userAuth } from '../middlewares/jwtAuth.js';


router.post('/signup',signup);
router.post('/login',login);
router.get('/logout',logout);
router.get('/check-auth',userAuth,checkAuthorisation);
router.get('/getUser',userAuth,getUserData);



export default router;