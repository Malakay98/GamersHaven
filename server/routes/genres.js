import express from 'express';
import { fetchAndInsertGenres } from '../controllers/genres.js';
import authMiddleware from '../controllers/auth.js';

const router = express.Router();


// Define the route for retrieving and inserting genres
router.get('/', authMiddleware, async (req, res) => {
    try {
        await fetchAndInsertGenres();
        res.send('Genres fetched and inserted successfully.');
    } catch (error) {
        console.error('Error fetching and inserting genres:', error);
        res.status(500).send('An error occurred while fetching and inserting genres.');
    }
});


// Export the router
export default router;