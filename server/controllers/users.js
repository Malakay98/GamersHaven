import { User } from '../models/users.js';
import db from '../database/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import validator from 'validator';
dotenv.config()


const secret = process.env.JWT_SECRET;


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.getAll();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error')
    }
};


export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.getById(id);
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' })
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}


export const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    //Check if email is a valid email address
    console.log(email);
    console.log(username);
    console.log(password);
    if (!validator.isEmail(email)) {
        return res.status(400).json({ msg: "Invalid email address" })
    }
    if (username && username.length < 6) {
        return res.status(400).json({ msg: "Username must be at least 6 characters long" })
    }
    if (password && password.length < 6) {
        return res.status(400).json({ msg: "Password must be at least 6 characters long" })
    }
    const capitalizedUser = username ? username.charAt(0).toUpperCase() + username.slice(1) : user.username;
    try {
        const existingUser = await User.getByEmail(email);
        if (existingUser) {
            return res.status(400).json({ msg: "User with the provided email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.createUser(capitalizedUser, email, hashedPassword)
        res.json({ msg: "User created:", user });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error")
    }
}

// Update user by ID
export const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    try {
        const user = await User.getById(id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        const isValidEmail = validator.isEmail(email);
        if (!isValidEmail) {
            return res.status(400).json({ msg: 'Invalid email address' });
        }
        if (username && username.length < 6) {
            return res.status(400).json({ msg: "Username must be at least 6 characters long" })
        }
        if (password && password.length < 6) {
            return res.status(400).json({ msg: "Password must be at least 6 characters long" })
        }
        const capitalizedUsername = username ? username.charAt(0).toUpperCase() + username.slice(1) : user.username;
        const conn = await db.getConnection();
        const [result, fields] = await conn.execute(
            'UPDATE users SET username=?, email=?, password=?, updated_at=NOW() WHERE idusers=?',
            [capitalizedUsername, email || user.email, password || user.password, id]
        );
        conn.release();
        if (result.affectedRows > 0) {
            res.json({ msg: 'User updated successfully' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Delete user by ID
export const deleteUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await User.deleteById(id);
        if (result) {
            res.json({ msg: 'User deleted successfully' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Generate the token
export const generateToken = (user) => {
    const payload = {
        user: {
            idusers: user.idusers,
            email: user.email,
        },
    };
    return JWT.sign(payload, secret, {
        expiresIn: '1h',
    });
};


// Validate the token
export const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const token = authHeader.substring(7);

    try {
        // Verify the token
        const decoded = JWT.verify(token, secret);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await User.getByEmail(email);
        // if the user is not found
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' })
        }
        // Compare the passwords
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(password);
        console.log(user.password);
        console.log(isMatch)
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials, password are not matched' })
        }
        const token = generateToken(user);
        res.json({
            token,
            user
        });
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
}

// Logout
export const logoutUser = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            res.status(500).send('Server Error');
        } else {
            res.json({ msg: 'User logged out successfully' });
        }
    });
};