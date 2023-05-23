import express from 'express';
import { getAllGames, addFavorite } from '../controllers/games.js';
import authMiddleware from '../controllers/auth.js';

const router = express.Router();

// Get all games
router.get('/', authMiddleware, getAllGames);

// Add game to user favorite list
router.post('/:id/favorites', authMiddleware, addFavorite);

export default router;