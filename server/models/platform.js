import db from '../database/db.js';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config()

export const Platforms = {
    getAllPlatformsDB: async () => {
        const conn = await db.getConnection();
        try {
            const [rows] = await conn.execute('SELECT * FROM platforms');
            return rows;
        } catch (error) {
            console.log(error);
            throw error
        } finally {
            conn.release()
        }
    },

    getPlatformById: async (platformId) => {
        const conn = await db.getConnection();
        try {
            const [rows] = await conn.execute('SELECT * FROM platforms WHERE platformId = ?', [platformId]);
            if (rows.length > 0) {
                return rows[0];
            }
            // If no matching platform is found
            return null;
        } catch (error) {
            console.error('Error fetching platform by ID', error);
            throw error;
        } finally {
            conn.release();
        }
    },

    getAllPlatformsAPI: async () => {
        try {
            const response = await axios.get('https://api.rawg.io/api/platforms', {
                params: {
                    key: process.env.RAWG_KEY,
                    page_size: 100, // Adjust the page size as per your needs
                },
            });

            const platforms = response.data.results;
            return platforms;
        } catch (error) {
            console.error('Error fetching platforms from API:', error);
            throw error;
        }
    },

    insertPlatforms: async (platformId, platformName) => {
        const conn = await db.getConnection();
        try {
            const [result] = await conn.execute('INSERT INTO platforms (platformId, name) VALUES (?, ?)', [
                platformId,
                platformName,
            ]);
            return result.affectedRows;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            conn.release();
        }
    }
}


export default Platforms;