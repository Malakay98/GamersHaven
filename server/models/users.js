import db from "../database/db.js";


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


    deleteById: async function (id) {
        const conn = await db.getConnection();
        const [result] = await conn.execute(
            'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?', [user.username, user.email, user.password, user.id]
        );
        conn.release();
        return result.affectedRows > 0
    },

    // Save user to database
    saveUser: async function (user) {
        const conn = await db.getConnection();
        const [result] = await conn.execute(
            'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?', [user.username, user.email, user.password, user.id]
        );
        conn.release();
        return result.affectedRows > 0;
    }
};

export default User;