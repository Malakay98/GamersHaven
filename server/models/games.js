import db from '../database/db.js';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config()

export const VideoGame = {
    getGameByName: async (gameName) => {
        try {
            const response = await axios.get('https://api.rawg.io/api/games', {
                params: {
                    key: process.env.RAWG_KEY,
                    search: gameName,
                },
            });
            return response.data.results;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getByGameId: async (gameId) => {
        const conn = await db.getConnection();
        try {
            const [result] = await conn.execute('SELECT * FROM video_games WHERE game_id = ?', [gameId]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            conn.release();
        }
    },

    insertGame: async (gameId, gameName, platforms) => {
        const conn = await db.getConnection();
        try {
            const [result] = await conn.execute('INSERT INTO video_games (gameId, game_name, platforms) VALUES (?, ?, ?)', [
                gameId,
                gameName,
                platforms,
            ]);
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            conn.release();
        }
    },
};

export default VideoGame;