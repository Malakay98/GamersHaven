import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config()

export const getAllGenres = async (req, res) => {
    try {
        // Make a GET request to the RAWG API to fetch the list of genres
        const response = await axios.get('https://api.rawg.io/api/genres', {
            params: {
                key: process.env.RAWG_KEY,
                page_size: 100, // I adjust the page size as I need
            },
        });
        const genres = response.data.results;
        res.json(genres);
    } catch (error) {
        console.error(error)
        res.status(500).send('Server Error');
    }
};

export const getGenreByName = async (req, res) => {
    const { name } = req.body;
    try {
        const response = await axios.get('https://api.rawg.io/api/genres', {
            params: {
                key: process.env.RAWG_KEY,
                page_size: 100, // I adjust the page size as I need
                search: name,
            },
        });
        const genres = response.data.results.filter(genre => genre.name === name);
        console.log(genres);
        res.json(genres);
    } catch (error) {
        console.error(error)
        res.status(500).send('Server Error');
    }
}