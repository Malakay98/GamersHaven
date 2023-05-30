import db from '../database/db.js';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config()


const TIMEOUT_DURATION = 5000; // Timeout duration in milliseconds

export const Genre = {
    getAllGenres: async () => {
        const conn = await db.getConnection();
        try {
            const [rows] = await conn.execute('SELECT * FROM genre');
            return rows;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            conn.release();
        }
    },

    getGenreById: async (genreId) => {
        const conn = await db.getConnection();
        try {
            const [result] = await conn.execute('SELECT * FROM genre WHERE genre_id = ?', [genreId]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            conn.release();
        }
    },

    getAllGenresAPI: async () => {
        const pageSize = 100;
        let currentPage = 1;
        let allGenres = [];
        try {
            let response;
            do {
                response = await axios.get('https://api.rawg.io/api/genres', {
                    params: {
                        key: process.env.RAWG_KEY,
                        page: currentPage,
                        page_size: pageSize,
                        timeout: TIMEOUT_DURATION,
                    },
                });

                const genres = response.data.results;
                allGenres = allGenres.concat(genres);

                currentPage++;
            } while (response.data.next); // Continue fetching next pages if available

            return allGenres;
        } catch (error) {
            console.error('Error fetching genres from API:', error);
            throw error;
        }
    },

    insertGenre: async (genreId, genreName) => {
        const conn = await db.getConnection();
        try {
            const [result] = await conn.execute('INSERT INTO genre (genre_id, name) VALUES (?, ?)', [
                genreId,
                genreName,
            ]);
            return result.affectedRows;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            conn.release();
        }
    }
};

export default Genre;