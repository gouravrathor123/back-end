const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const employeeRouter = require('./routes/employee');
const ownerRouter = require('./routes/owner');
const todoRouter = require('./routes/todo');
const catalogRouter = require('./routes/catalog');
const productRouter = require('./routes/product');
const taskRouter = require('./routes/task');
const dailyreport = require('./routes/dailyreport');
const directoryRouter = require('./routes/directory');
const { static } = require('express');

require('dotenv').config();

const app = express();

app.use("/ownerprofilepics",express.static("ownerprofilepics"));
app.use(cors());
app.use(express.json());
app.use(employeeRouter);
app.use(ownerRouter);
app.use(todoRouter);
app.use(catalogRouter);
app.use(productRouter);
app.use(taskRouter);
app.use(dailyreport);
app.use(directoryRouter);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connected to Database.")
});

app.listen(process.env.LOCAL_PORT, () => {
    console.log(`Server is running at port: ${process.env.LOCAL_PORT}`);
});
