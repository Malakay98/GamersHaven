import Platforms from '../models/platform.js';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config()

export const getAllPlatformsFromAPI = async (req, res) => {
    try {
        const platforms = await Platforms.getAllPlatformsAPI();
        console.log(platforms)
        res.json({ platforms })
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error');
    }
}

export const getAllPlatformsFromDB = async (req, res) => {
    try {
        const platforms = await Platforms.getAllPlatformsDB();
        res.json({ platforms });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error')
    }
}

export const fetchAndInsertPlatforms = async (req, res) => {
    try {
        // Fetch platforms from the API
        const platformsAPI = await Platforms.getAllPlatformsAPI();

        // Insert the platforms into the database
        const insertedCount = await Promise.all(platformsAPI.map(async (platform) => {
            const platformId = platform.id;
            const platformName = platform.name;

            // Check if the platform already exists in the database
            const existingPlatform = await Platforms.getPlatformById(platformId);
            if (existingPlatform) {
                console.log(`Platform ${platformName} (ID: ${platformId}) already exists in the database.`);
                return 0; // Skip insertion and return 0 to indicate it wasn't inserted
            }

            // Insert the platform into the database
            await Platforms.insertPlatforms(platformId, platformName);
            return 1; // Return 1 to indicate successful insertion
        }));

        const insertedPlatformsCount = insertedCount.reduce((total, count) => total + count, 0);
        console.log(`Inserted ${insertedPlatformsCount} platforms into the table.`);
        // Statement for both cases
        if (insertedPlatformsCount > 0) {
            // Send a success response if at least one platform was inserted
            res.status(200).json({ message: 'Platforms inserted successfully' });
        } else {
            // Send a response indicating no platforms were added
            res.status(200).json({ message: 'No new platforms were added' });
        }
    } catch (error) {
        console.error('Error fetching and inserting platforms:', error);
        res.status(500).send('Server Error');
    }
}