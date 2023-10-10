const express = require("express");
const app = express();
const cloudinary = require('cloudinary').v2
require('dotenv').config();
const cors = require('cors')

const corsOptions = {
    origin: ['https://alex-grimes-fullstack.herokuapp.com', 'http://localhost:3000' ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDAPIKEY,
    api_secret: process.env.CLOUDINARYSECRET,
})

app.get('/api/videos', async (req, res) => {
    console.log("hello?")
    try {
        const result = await cloudinary.api.resources({ resource_type: 'video' })
        console.log("backend result: " + JSON.stringify(result))
        res.json(result)
    } catch (error) {
        console.error('Error fetching videos from Cloudinary: ', error)
        res.status(500).json({ error: 'Internal server error' });
    }
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})