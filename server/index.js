import express from "express";
import * as dotenv from 'dotenv'
import userRoutes from './routes/users.js';
import gamesRoutes from './routes/games.js'
dotenv.config()

const app = express();

// Parse JSON request bodies
app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// Routes for user
app.use('/users', userRoutes);

// Routes for games
app.use('/games', gamesRoutes)


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => console.log(`Server runing on port http://localhost:${PORT}`))