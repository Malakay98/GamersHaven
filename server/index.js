import express from "express";
import * as dotenv from 'dotenv'
import userRoutes from './routes/users.js';
dotenv.config()

const app = express();

// Parse JSON request bodies
app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// Routes for user
app.use('/users', userRoutes);


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => console.log(`Server runing on port http://localhost:${PORT}`))