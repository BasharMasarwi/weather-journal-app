// Setup empty JS object to act as endpoint for all routes
projectData = [];

 const express = require('express');
 const app = express();
 const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, listening);

function listening() {
    console.log(`server running`);
    console.log(`running on localhost: ${port}`);
}

app.get('/all', function (req, res) {
res.send(projectData);
projectData = [];
});

app.post('/add', addData);

function addData(req, res) {
   console.log(req.body);
   newData ={
    data : req.body.data,
    temp : req.body.temp,
    content : req.body.content
   }
   projectData.push(newData);   
}



















