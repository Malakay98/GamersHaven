import express from 'express';
import { getAllUsers, getUserById, createUser, updateUserById, deleteUserById, loginUser, logoutUser} from '../controllers/users.js';


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
router.post('/login', loginUser)

// Logout user
router.post('/logout', logoutUser)


export default router;