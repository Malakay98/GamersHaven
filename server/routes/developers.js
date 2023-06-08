import express from 'express';
import {  getAllDevelopers, getDeveloperByName } from '../controllers/developers.js';
import authMiddleware from '../controllers/auth.js';

const router = express.Router();

// Get Platforms from the API
router.get('/', authMiddleware, getAllDevelopers);

// Get Platforms from the DB
router.get('/getByName', authMiddleware, getDeveloperByName);

// Export the router
export default router;