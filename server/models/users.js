import db from "../database/db.js";
import axios from "axios";


// User model
export const User = {
    // Create a new User
    createUser: async function (username, email, password) {
        const conn = await db.getConnection();
        const [results, fields] = await conn.execute(
            'INSERT INTO users (username, email, password, created_At) VALUES (?, ?, ?, NOW())', [username, email, password]
        );
        // release() function release the connection back to the pool, making again available for other quotes
        conn.release();
        // represents the auto-generated ID of the inserted user.
        return results.insertId;
    },

    // Get All Users
    getAll: async function () {
        // Generate a promise to get a connection
        const conn = await db.getConnection();
        const [results, fields] = await conn.execute('SELECT * FROM users');
        conn.release();
        return results;
    },


    // Get only one user by the id
    getById: async function (id) {
        const conn = await db.getConnection();
        const [results, fields] = await conn.execute(
            'SELECT * FROM users WHERE id = ?', [id]
        );
        conn.release();
        if (results.length > 0) {
            return results[0]; // Return the user object
        }
        return null; //Return null if user not found
    },

    // Find user by email
    getByEmail: async function (email) {
        const conn = await db.getConnection();
        const [results, fields] = await conn.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        conn.release();
        if (results.length > 0) {
            return results[0]; // Return the user object
        }
        return null; // Return null if user not found
    },

    // Find user by username
    getByUsername: async function (username) {
        const conn = await db.getConnection();
        const [results, fields] = await conn.execute(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );
        conn.release();
        if (results.length > 0) {
            return results[0]; // Return the user object
        }
        return null; // Return null if user not found
    },

    updateById: async function (id, username, email, password) {
        const conn = await db.getConnection();
        const [result] = await conn.execute(
            'UPDATE users SET username=?, email=?, password=?, updated_at=NOW() WHERE id=?', [username, email, password, id]
        );
        conn.release();
        return result.affectedRows > 0;
    },

    deleteById: async function (id) {
        const conn = await db.getConnection();
        const [result] = await conn.execute(
            'DELETE FROM users WHERE id = ?', [id]
        );
        conn.release();
        return result.affectedRows > 0;
    },

    // Save user to database
    saveUser: async function (user) {
        const conn = await db.getConnection();
        const [result] = await conn.execute(
            'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?', [user.username, user.email, user.password, user.id]
        );
        conn.release();
        return result.affectedRows > 0;
    },

    addFavorite: async function (userId, gameId) {
        const conn = await db.getConnection();
        try {
            // Check if the user and game exist
            const [userResult] = await conn.execute('SELECT * FROM users WHERE id = ?', [userId])

            // Fetch game information from RAWG API
            const gameResponse = await axios.get(`https://api.rawg.io/api/games/${gameId}`, {
                params: {
                    key: process.env.RAWG_KEY,
                },
            });
            const game = gameResponse.data;
            console.log(game)

            if (!game) {
                return false;
            }

            if (userResult.length === 0 || gameResponse.length === 0) {
                return false;
            }

            // Store the game in the video_games table
            await conn.execute('INSERT INTO video_games (game_id, title, developer, publisher, release_date, description, rating, image_url, genre_id, platformId, metacritic) VALUES (?, ?, ?)', [game.id, game.name, game.released, game.description, game.rating, game.background_image, game.metacritic]);

            // Add the favorite to user_favorites table
            await conn.execute('INSERT INTO user_favorites (user_id, game_id) VALUES (?, ?)', [userId, gameId]);

            return true;
        } catch (error) {
            console.log(error);
            return false
        } finally {
            // Release the connection back to the connection pool.
            conn.release()
        }
    }
};

export default User;