import express from 'express';
import {  getAllPlatforms, getPlatformByName } from '../controllers/platforms.js';
import authMiddleware from '../controllers/auth.js';

const router = express.Router();

// Get Platforms from the API
router.get('/', authMiddleware, getAllPlatforms);

// Get Platforms from the DB
router.get('/getByName', authMiddleware, getPlatformByName);

// Export the router
export default router;