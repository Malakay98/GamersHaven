import db from '../database/db.js';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();


export const Developer = {
    getAllDevelopersDB: async () => {
        const conn = await db.getConnection();
        try {
            const [rows] = await conn.execute('SELECT * FROM developers');
            return rows;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            conn.release()
        }
    },


    getDeveloperById: async (developerId) => {
        const conn = await db.getConnection();
        try {
            const [rows] = await conn.execute('SELECT * FROM developers WHERE developer_id = ?', [developerId]);
            if (rows.length > 0) {
                return rows[0];
            }
            // If no matching developer is found
            return null
        } catch (error) {
            console.error('Error fetching developer by ID', error)
            throw error;
        } finally {
            conn.release();
        }
    },


    getAllDevelopersAPI: async () => {
        try {
            const response = await axios.get('https://api.rawg.io/api/developers', {
                params: {
                    key: process.env.RAWG_KEY,
                    page_size: 100,
                },
            });

            const developers = response.data.results
            return developers;
        } catch (error) {
            console.error('Error fetching developers from API:', error);
            throw error;
        }
    },

    insertDevelopers: async (developerId, developerName) => {
        const conn = await db.getConnection();
        try {
            const [result] = await conn.execute('INSERT INTO developers (developer_id, name) VALUES (?, ?)', [
                developerId, developerName,
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


export default Developer;