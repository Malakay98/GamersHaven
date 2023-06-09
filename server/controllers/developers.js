import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config()


export const getAllDevelopers = async (req, res) => {
    try {
        const response = await axios.get('https://api.rawg.io/api/developers', {
            params: {
                key: process.env.RAWG_KEY,
                page_size: 200,
            },
        });
        const developers = response.data.results
        res.json(developers)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
}


export const getDeveloperByName = async (req, res) => {
    const { name } = req.body;
    try {
        const response = await axios.get('https://api.rawg.io/api/developers', {
            params: {
                key: process.env.RAWG_KEY,
                page_size: 200,
                search: name,
            },
        });
        const developers = response.data.results[0];
        res.json(developers)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
}