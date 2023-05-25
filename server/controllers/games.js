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


// Get game by his name
export const getGameByName = async (req, res) => {
    const { name } = req.body
    try {
        const response = await axios.get('https://api.rawg.io/api/games', {
            params: {
                key: process.env.RAWG_KEY,
                search: name,
            },
        });
        const game = response.data.results[0];
        res.json(game);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error')
    }
}

// Add games to fav lists
export const addFavoriteGame = async (req, res) => {
    const { id } = req.params;
    const { idGame } = req.body;

    try {
        // Check if the user exists
        const userId = parseInt(id, 10);
        const gameId = parseInt(idGame, 10);
        const user = await User.getById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Add the game to the user's favorite list
        const result = await User.addFavorite(userId, gameId);
        if (result) {
            res.json({ msg: 'Game added to your list successfully' });
        } else {
            res.status(500).json({ msg: 'Failed to add game to favorites' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
};
