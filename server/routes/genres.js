import express from 'express';
import { getAllGenres, getGenreByName } from '../controllers/genres.js';
import authMiddleware from '../controllers/auth.js';

const router = express.Router();

// Get all genres from the API
router.get('/', authMiddleware, getAllGenres);

// Get all genres from the DB
router.get('/getByName', authMiddleware, getGenreByName);


// Export the router
export default router;