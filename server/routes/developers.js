import express from 'express';
import {  getAllDevelopersFromAPI, getAllDevelopersFromDB, fetchAndInsertDevelopers } from '../controllers/developers.js';
import authMiddleware from '../controllers/auth.js';

const router = express.Router();

// Get Platforms from the API
router.get('/getAPI', authMiddleware, getAllDevelopersFromAPI);

// Get Platforms from the DB
router.get('/getDB', authMiddleware, getAllDevelopersFromDB);

// Get and insert the platforms name's and id's
router.get('', authMiddleware, fetchAndInsertDevelopers);

// Export the router
export default router;