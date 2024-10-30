const mongoose = require('mongoose');
require('dotenv').config();

//define the Mongodb connection url
//const mongoURL = 'mongodb://localhost:27017/hotels';
const mongodb = process.env.MONGODB_URL;
//const mongodb = process.env.MONGODB_URL_LOCAL;

//setup MongoDB connection
mongoose.connect(mongodb);

//get the default connection
//Mongoose maintains a default connection object representing the MongoDB connection
const db = mongoose.connection;

//define event listeners for database connection
db.on('connected', () => {
    console.log('Connected to MongoDB server')
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected')
});

db.on('error', () => {
    console.log('MongoDB connection error')
});

//export the database connection
module.exports = db;

