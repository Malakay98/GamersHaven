import express from 'express';
import { getAllUsers, getUserById, createUser, updateUserById, deleteUserById, login, logout, addToFavorite} from '../controllers/users.js';
import authMiddleware from '../controllers/auth.js';


const router = express.Router()


// Get all users
router.get('/', getAllUsers);

// Get specific user
router.get('/:id', getUserById);

// Create user
router.post('/', createUser);

// Update user
router.put('/:id', updateUserById);

// Delete user
router.delete('/:id', deleteUserById)

// Login user
router.post('/login', login)

// Logout user
router.post('/logout', logout)

// Add game to favorite
router.post('/:id/favorite', authMiddleware, addToFavorite)


export default router;