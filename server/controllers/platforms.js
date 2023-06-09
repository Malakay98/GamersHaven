import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config()

export const getAllPlatforms = async (req, res) => {
    try {
        const response = await axios.get('https://api.rawg.io/api/platforms', {
            params: {
                key: process.env.RAWG_KEY,
                page_size: 300,
            },
        });
        const platforms = response.data.results
        res.json({ platforms })
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error');
    }
}

export const getPlatformByName = async (req, res) => {
    const {name} = req.body
    try {
        const response = await axios.get('https://api.rawg.io/api/platforms', {
            params: {
                key: process.env.RAWG_KEY,
                page_size: 300,
                search: name,
            },
        });
        const platforms = response.data.results[0]
        res.json({ platforms })
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error')
    }
}