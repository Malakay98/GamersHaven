import Developer from '../models/developers.js';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config()


export const getAllDevelopersFromAPI = async (req, res) => {
    try {
        const developers = await Developer.getAllDevelopersAPI();
        console.log(developers)
        res.json({ developers })
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
}

export const getAllDevelopersFromDB = async (req, res) => {
    try {
        const developers = await Developer.getAllDevelopersDB();
        res.json({ developers })
    } catch (error) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

export const fetchAndInsertDevelopers = async (req, res) => {
    try {
        // Get and store on variable the Developers from api
        const developerAPI = await Developer.getAllDevelopersAPI();

        // Insert the developers into the database
        const insertedCount = await Promise.all(developerAPI.map(async (developer) => {
            const developerId = developer.id;
            const developerName = developer.name;

            // Check if the developer already exists in the database
            const existingDeveloper = await Developer.getDeveloperById(developerId);
            if (existingDeveloper) {
                console.log(`Developer ${developerName} (ID: ${developerId}) already exists in the database.`);
                // Skip the insertion and return 0 to indicate that wasn't inserted
                return 0;
            }

            // Insert the developer into the database
            await Developer.insertDevelopers(developerId, developerName);
            // Return 1 to indicate that the developer was succesfully inserted
            return 1;
        }))

        const insertedDevelopersCount = insertedCount.reduce((total, count) => total + count, 0);
        console.log(`Inserted ${insertedDevelopersCount} developers into the table`);
        // Statement for both cases
        if (insertedDevelopersCount > 0) {
            // Send a response that at least one developer was added
            res.status(200).json({ message: 'Developers inserted successfully'});
        } else {
            // Send a response indicating no developers were addded
            res.status(200).json({ message: 'No new developers were added'});
        }
    } catch (error) {
        console.error('Error fetching and inserting developers:', error);
        res.status(500).send('Server Error');
    }
}