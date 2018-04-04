// ------------------------------------------------------------- Require modules
const express = require('express');
const request = require('request');
const cors = require('cors');

// -------------------------------------------------------- Setup main variables
const app = express();
const port = '3000';
const publicPath = './dist';
const numberOfUsers = 20;
const apiPath = `https://randomuser.me/api/?results=${numberOfUsers}&nat=au`;

// ---------------------------------------------------------------------- Routes

// Add cors headers
app.use(cors());

// Setup static file routes
app.use(express.static(publicPath));

// Setup API call for generating random people
app.route('/api/v1/people')
    .get((req, res) => {
        // Load the users...
        request(apiPath, (err, response, body) => {
            // Map the needed data
            const users = JSON.parse(body).results.map(user => ({
                name: user.name,
                profile: user.picture.medium
            }));
            // Then return them
            res.json(users);
        });
    });


app.listen(port);
