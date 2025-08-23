const port = 3002;
const express = require('express');
const mongoose = require('mongoose');
const connectDB = async () => { 
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test');
        console.log('MongoDB connected...');
    } catch (err) {
        console.log("db is not connected");
        console.error(err.message);
        process.exit(1);
    }
}