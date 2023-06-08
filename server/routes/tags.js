import express from 'express';
import {  getAllTags, getTagByName } from '../controllers/tags.js';
import authMiddleware from '../controllers/auth.js';

const router = express.Router();

// Get Platforms from the API
router.get('/', authMiddleware, getAllTags);

// Get Platforms from the DB
router.get('/getByName', authMiddleware, getTagByName);

// Export the router
export default router;