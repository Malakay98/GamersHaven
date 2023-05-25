import Genre from '../models/genres.js';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config()


export const fetchAndInsertGenres = async () => {
    try {
        // Make a GET request to the RAWG API to fetch the list of genres
        const response = await axios.get('https://api.rawg.io/api/genres', {
            params: {
                key: process.env.RAWG_KEY,
                page_size: 100, // Adjust the page size as per your needs
            },
        });

        // Extract the genres from the API response
        const genres = response.data.results;

        // Insert the genres into the genres table
        const insertedCount = await Promise.all(genres.map(async (genre) => {
            const genreId = genre.id;
            const genreName = genre.name;

            // Insert the genre into the genres table
            await Genre.insertGenre(genreId, genreName);
        }));

        console.log(`Inserted ${insertedCount.length} genres into the table.`);
    } catch (error) {
        console.error('Error fetching and inserting genres:', error);
    }
};