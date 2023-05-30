import express from 'express';
import {  getAllTagsFromAPI, getAllTagsFromDB, fetchAndInsertTags } from '../controllers/tags.js';
import authMiddleware from '../controllers/auth.js';

const router = express.Router();

// Get Platforms from the API
router.get('/getAPI', authMiddleware, getAllTagsFromAPI);

// Get Platforms from the DB
router.get('/getDB', authMiddleware, getAllTagsFromDB);

// Get and insert the platforms name's and id's
router.get('', authMiddleware, fetchAndInsertTags);

// Export the router
export default router;