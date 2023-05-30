import db from '../database/db.js';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

const TIMEOUT_DURATION = 5000; // Timeout duration in milliseconds

export const Tag = {
    getAllTagsDB: async () => {
        const conn = await db.getConnection();
        try {
            const [rows] = await conn.execute('SELECT * FROM tags');
            return rows;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            conn.release()
        }
    },


    getTagById: async (tagId) => {
        const conn = await db.getConnection();
        try {
            const [rows] = await conn.execute('SELECT * FROM tags WHERE tag_id = ?', [tagId]);
            if (rows.length > 0) {
                return rows[0];
            }
            // If no matching tag is found
            return null
        } catch (error) {
            console.error('Error fetching tag by ID', error)
            throw error;
        } finally {
            conn.release();
        }
    },


    getAllTagsAPI: async () => {
        const pageSize = 100;
        let currentPage = 1;
        let allTags = [];
        try {
            let response;
            do {
                response = await axios.get('https://api.rawg.io/api/tags', {
                    params: {
                        key: process.env.RAWG_KEY,
                        page: currentPage,
                        page_size: pageSize,
                        timeout: TIMEOUT_DURATION,
                    },
                });

                const tags = response.data.results;
                allTags = allTags.concat(tags);

                currentPage++;
            } while (response.data.next); // Continue fetching next pages if available

            return allTags;
        } catch (error) {
            console.error('Error fetching tags from API:', error);
            throw error;
        }
    },

    insertTags: async (tagId, tagName) => {
        const conn = await db.getConnection();
        try {
            const [result] = await conn.execute('INSERT INTO tags (tag_id, name) VALUES (?, ?)', [
                tagId, tagName,
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


export default Tag;