import User from '../models/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import validator from 'validator';
dotenv.config()


const secret = process.env.JWT_SECRET;


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

export const createUser = async (req, res) => {
    const { username, email, password } = req.body;

    // Check if email is a valid email address
    if (!validator.isEmail(email)) {
        return res.status(400).json({ msg: 'Invalid email address' });
    }

    if (username && username.length < 6) {
        return res.status(400).json({ msg: 'Username must be at least 6 characters long' });
    }

    if (password && password.length < 6) {
        return res.status(400).json({ msg: 'Password must be at least 6 characters long' });
    }

    const capitalizedUser = username ? username.charAt(0).toUpperCase() + username.slice(1) : user.username;

    try {
        // Check if user with the same email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ msg: 'User with the provided email already exists' });
        }

        // Check if user with the same username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ msg: 'User with the provided username already exists' });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user with the hashed password
        const user = await User.create({
            username: capitalizedUser,
            email,
            password: hashedPassword,
        });

        res.json({ msg: 'User created:', user });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
};

// Update user by ID
export const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            id,
            { username, email, password },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

export const deleteUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted', user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};


export const addToFavorite = async (req, res) => {
    const { userId, gameId } = req.body;

    try {
        // Find the user by userId
        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the game is already in the user's favorites
        if (user.favorites.includes(gameId)) {
            return res.status(400).json({ message: "Game already in favorites" });
        }

        // Add the game to the favorites array
        user.favorites.push(gameId);
        await user.save();

        res.json({ message: "Game added to favorites successfully", user })
    } catch {
        console.error(error);
        res.status(500).send('Server error')
    }
};


// Login Controller
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        // Check if the password is correct
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Verify the generated token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                // Handle token verification error
                return res.status(401).json({ message: 'Failed to authenticate token' });
            }

            // Assign the decoded payload to a variable
            const decodedToken = decoded;

            // Return the token and user details
            res.json({ token, user, decodedToken });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};


// Logout
export const logout = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            res.status(500).send('Server Error');
        } else {
            res.json({ msg: 'User logged out successfully' });
        }
    });
};