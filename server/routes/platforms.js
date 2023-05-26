import express from 'express';
import {  getAllPlatformsFromDB, getAllPlatformsFromAPI, fetchAndInsertPlatforms } from '../controllers/platforms.js';
import authMiddleware from '../controllers/auth.js';

const router = express.Router();

// Get Platforms from the API
router.get('/getAPI', authMiddleware, getAllPlatformsFromAPI);

// Get Platforms from the DB
router.get('/getDB', authMiddleware, getAllPlatformsFromDB);

// Get and insert the platforms name's and id's
router.get('', authMiddleware, fetchAndInsertPlatforms);

// Export the router
export default router;