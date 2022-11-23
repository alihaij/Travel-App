
// Setup empty JS object to act as endpoint for all routes


// Start up an instance of app

/* Dependencies */
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance

// Initialize the main project folder

// Spin up the server
// Callback to debug

// Initialize all route with a callback function

// Callback function to complete GET '/all'

// Post Route


// Setup empty JS object to act as endpoint for all routes
projectData = {};
const port = 8000;
// Express to run server and routes
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
// Require Express to run server and routes
const app = express();


// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
app.listen(port, listening);
function listening() {
    console.log(`server Running on this Link: http://localhost:${port}`);
}
app.get('/getAll', (req, res) => {
    res.send(projectData).status(200).end();
});

app.post('/postData', (req, res) => {
    projectData = {
        temp: req.body.temp,
        date: req.body.date,
        response: req.body.content
    }
    res.send(projectData).status(200).end();
    console.log(projectData);
});