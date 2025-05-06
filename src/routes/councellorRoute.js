import express from 'express';

const router = express.Router();


import { loginCounsellor } from '../controllers/councellorControllers.js'

router.post('/login',loginCounsellor);



export default router;