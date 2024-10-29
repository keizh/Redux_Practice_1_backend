const mongoose = require("mongoose");

async function dbConnect() {
  try {
    const dbObject = await mongoose.connect(process.env.MONGODB);
    if (dbObject) {
      console.log(`mongoDB connection has been established`);
    }
  } catch (err) {
    console.log(`failed to established DB connection`);
  }
}

module.exports = dbConnect;
