const mongoose = require("mongoose");
const { MONGO_URL } = process.env;

mongoose.connect(MONGO_URL).then(() => console.log("Connected to DB"));

const connection = mongoose.connection;

module.exports = connection;

module.exports.connect = async () => {
  await mongoose.connect(MONGO_URL);
};

module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

module.exports.clearDatabase = async () => {
  const collections = mongoose.connection.collection;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};
