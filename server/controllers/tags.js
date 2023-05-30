import Tag from '../models/tags.js';
import * as dotenv from 'dotenv';
dotenv.config()

export const getAllTagsFromAPI = async (req, res) => {
    try {
        const tags = await Tag.getAllTagsAPI();
        console.log(tags)
        res.json({ tags })
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error');
    }
}

export const getAllTagsFromDB = async (req, res) => {
    try {
        const tags = await Tag.getAllTagsDB();
        res.json({ tags });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error')
    }
}

export const fetchAndInsertTags = async (req, res) => {
    try {
        // Fetch tags from the API
        const tagsAPI = await Tag.getAllTagsAPI();

        // Insert the tags into the database
        const insertedCount = await Promise.all(tagsAPI.map(async (tag) => {
            const tagId = tag.id;
            const tagName = tag.name;

            // Check if the tags already exists in the database
            const existingTag = await Tag.getTagById(tagId);
            if (existingTag) {
                console.log(`Tag ${tagName} (ID: ${tagId}) already exists in the database.`);
                return 0; // Skip insertion and return 0 to indicate it wasn't inserted
            }

            // Insert the tag into the database
            await Tag.insertTags(tagId, tagName);
            return 1; // Return 1 to indicate successful insertion
        }));

        const insertedTagsCount = insertedCount.reduce((total, count) => total + count, 0);
        console.log(`Inserted ${insertedTagsCount} tags into the table.`);
        // Statement for both cases
        if (insertedTagsCount > 0) {
            // Send a success response if at least one platform was inserted
            res.status(200).json({ message: 'Tags inserted successfully' });
        } else {
            // Send a response indicating no tags were added
            res.status(200).json({ message: 'No new tags were added' });
        }
    } catch (error) {
        console.error('Error fetching and inserting tags:', error);
        res.status(500).send('Server Error');
    }
}