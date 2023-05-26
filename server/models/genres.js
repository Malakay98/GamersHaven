import db from '../database/db.js';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config()

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
            const [result] = await conn.execute('SELECT * FROM genres WHERE genre_id = ?', [genreId]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            conn.release();
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