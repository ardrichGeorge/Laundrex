import express from 'express';
import userRouter from './user.js';
import orderRouter from './order.js';
import serviceRouter from './service.js';

const router = express.Router();

router.use('/user', userRouter);
router.use('/order', orderRouter);
router.use('/service', serviceRouter);

export default router;
