const mongoose = require('mongoose');

//define the Mongodb connection url
const mongoURL = 'mongodb://localhost:27017/hotels';

//setup MongoDB connection
mongoose.connect(mongoURL);

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

