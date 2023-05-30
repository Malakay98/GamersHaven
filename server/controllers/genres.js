import Genre from '../models/genres.js';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config()

export const getAllGenresFromAPI = async (req, res) => {
    try {
        // Make a GET request to the RAWG API to fetch the list of genres
        const response = await axios.get('https://api.rawg.io/api/genres', {
            params: {
                key: process.env.RAWG_KEY,
                page_size: 100, // Adjust the page size as per your needs
            },
        });
        const genres = response.data.results;
        console.log(genres)
        res.json({ genres })
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error');
    }
}

export const getAllGenresFromDB = async (req, res) => {
    try {
        const genres = await Genre.getAllGenres();
        res.json();
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error')
    }
}

export const fetchAndInsertGenres = async (req, res) => {
    try {
        // Fetch Genres from the API
        const genresAPI = await Genre.getAllGenresAPI();

        // Insert the genres into the database
        const insertedCount = await Promise.all(genresAPI.map(async (genre) => {
            const genreId = genre.id;
            const genreName = genre.name;

            // Check if the genre already exists in the database
            const existingGenre = await Genre.getGenreById(genreId);
            if (existingGenre) {
                console.log(`Genre ${genreName} (ID: ${genreId}) already exists in the database.`);
                return 0; // Skip insertion and return 0 to indicate it wasn't inserted
            }

            // Insert the Genre into the database
            await Genre.insertGenre(genreId, genreName);
            return 1; // Return 1 to indicate successful insertion
        }));

        const insertedGenreCount = insertedCount.reduce((total, count) => total + count, 0);
        console.log(`Inserted ${insertedGenreCount} genres into the table.`);
        // Statement for both cases
        if (insertedGenreCount > 0) {
            // Send a success response if at least one genre was inserted
            res.status(200).json({ message: 'Genres inserted successfully' });
        } else {
            // Send a response indicating no genres were added
            res.status(200).json({ message: 'No new genres were added' });
        }
    } catch (error) {
        console.error('Error fetching and inserting genres:', error);
        res.status(500).send('Server Error');
    }
}