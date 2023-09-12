// api routes
import express from 'express';
import courseRoutes from './courseRoutes.js';
// import userRoutes from './userRoutes.js';
// import authRoutes from './authRoutes.js';

const router = express.Router();

// Route groups for courses, users, and authentication
router.use('/courses', courseRoutes);
// router.use('/users', userRoutes);
// router.use('/auth', authRoutes);

export default router;