const mongoose = require("mongoose");

const user = process.env.DB_USER || '';
const pass = process.env.DB_PASSWORD || '';
const port = process.env.PORT || 27017;
const cluster = process.env.DB_CLUSTER || '';
const client = mongoose;
client.connect(
  `mongodb://${user}:${pass}@${cluster}:${port}/?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

module.exports = client;
