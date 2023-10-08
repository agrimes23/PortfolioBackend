const express = require("express");
const app = express();
const cloudinary = require('cloudinary').v2
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDAPIKEY,
    api_secret: process.env.CLOUDINARYSECRET,
})

app.get('/api/videos', async (req, res) => {
    try {
        const result = await cloudinary.api.resources({ type: 'video' })
        res.json(result)
    } catch (error) {
        console.error('Error fetching videos from Cloudinary: ', error)
        res.status(500).json({ error: 'Internal server error' });
    }
})

const port = 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})