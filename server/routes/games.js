import express from 'express';
import { getAllGames, getGameByName ,addFavoriteGame } from '../controllers/games.js';
import authMiddleware from '../controllers/auth.js';

const router = express.Router();

// Get all games
router.get('/', authMiddleware, getAllGames);

// Get game by name
router.get('/game', authMiddleware, getGameByName)

// Add game to user favorite list
router.post('/:id/favorites', authMiddleware, addFavoriteGame);

export default router;