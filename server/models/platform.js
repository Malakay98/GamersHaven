import db from '../database/db.js';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config()

const TIMEOUT_DURATION = 5000; // Timeout duration in milliseconds

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
        const pageSize = 100;
        let currentPage = 1;
        let allPlatforms = [];
        try {
            let response;
            do {
                response = await axios.get('https://api.rawg.io/api/platforms', {
                    params: {
                        key: process.env.RAWG_KEY,
                        page: currentPage,
                        page_size: pageSize,
                        timeout: TIMEOUT_DURATION,
                    },
                });

                const platforms = response.data.results;
                allPlatforms = allPlatforms.concat(platforms);

                currentPage++;
            } while (response.data.next); // Continue fetching next pages if available

            return allPlatforms;
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