const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const viewRoutes = require('./src/view.js');
var path = require('path')
require('dotenv').config()


const PORT = process.env.PORT || 3002;
//Setting Up Dynamic port allocation

const app = express();
//Creating express object

app.server = http.createServer(app);
//Create HTTP server

app.use(morgan('dev'));
//To Get Apache Log Format in Console for Handling Requests

app.use(cors({
    exposedHeaders: "*"
}));
//To Allow Cross Origin Accessability

app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(bodyParser.urlencoded({ extended: true }));
//Setting Attachement Size limit
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/api/v1/', apiRoutes);
// Setting Routes for APIs


app.use('/', viewRoutes);
// Setting Routes for Views


// Turn on that server!
app.listen(PORT, () => {
    console.log('App listening on port ',PORT );
  });