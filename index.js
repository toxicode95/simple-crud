require('dotenv').config();
require('./config/db');
const express = require("express");
const mongoose = require('mongoose');

const dbName = process.env.DB_NAME || 'user';

const app = express();
const router = require('./router');
const { httpStatus } = require('./config/constants');
const { formatter } = require('./middleware');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
db.useDb(dbName);

app.use(express.json());
app.use(formatter());
app.use('/', router);

app.use((req, res) => res.response(httpStatus.notFound, ({ message: 'API not found' })));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
