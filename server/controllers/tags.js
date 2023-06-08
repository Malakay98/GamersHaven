import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config()

export const getAllTags = async (req, res) => {
    try {
        const response = await axios.get('https://api.rawg.io/api/tags', {
            params: {
                key: process.env.RAWG_KEY,
                page_size: 300,
            },
        });
        const tags = response.data.results
        res.json({ tags})
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error');
    }
}

export const getTagByName = async (req, res) => {
    const {name} = req.body
    try {
        const response = await axios.get('https://api.rawg.io/api/tags', {
            params: {
                key: process.env.RAWG_KEY,
                search: name,
            },
        });
        const tag = response.data.results[0]
        res.json({ tag })
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error');
    }
}