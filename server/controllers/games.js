import User from '../models/users.js';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config()

// Get games
export const getAllGames = async (req, res) => {
    try {
        const response = await axios.get('https://api.rawg.io/api/games', {
            params: {
                key: process.env.RAWG_KEY, // Replace with your API key from the .env file
            },
        });
        const games = response.data.results;
        console.log(games)
        res.json({ games });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};



// Add games to fav lists
export const addFavorite = async (req, res) => {
    const { id } = req.params;
    const { gameId } = req.body;

    try {
        // Check if the user exists
        const user = await User.getById(id);
        console.log(user)
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Fetch game information from RAWG API
        const gameResponse = await axios.get(`https://api.rawg.io/api/games/${gameId}`, {
            params: {
                key: process.env.RAWG_KEY,
            }
        })

        const game = gameResponse.data;

        if (!game) {
            return res.status(400).json({ msg: 'Game not found' });
        }

        // Add the game to the user's favorite list
        const result = await User.addFavorite(id, game);
        if (result) {
            res.json({ msg: 'Game added to your list successfully' });
        } else {
            res.status(500).json({ msg: 'Failed to add game to favorites' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
}

