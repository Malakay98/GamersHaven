import JWT, { decode } from "jsonwebtoken";
import User from "../models/users.js";
import * as dotenv from "dotenv";
dotenv.config()


const authMiddleware = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "No token, authorization denied"});
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        if(!decoded.user || !decoded.user.id) {
            return res.status(401).json({ msg: "The data inside the token doesn't correspond to the user"});
        }
        const user = await User.getById(decoded.user.id);
        if (!user) {
            return res.status(401).json({ msg: "Invalid token, authorization denied"});
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
};

export default authMiddleware;