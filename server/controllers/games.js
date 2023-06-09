import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config()

// Get games
export const getAllGames = async (req, res) => {
    try {
        const response = await axios.get('https://api.rawg.io/api/games', {
            params: {
                key: process.env.RAWG_KEY,
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



