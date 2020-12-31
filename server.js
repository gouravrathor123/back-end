const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connected to Database.")
});

app.listen(process.env.LOCAL_PORT, () => {
    console.log(`Server is running at port: ${process.env.LOCAL_PORT}`)
});