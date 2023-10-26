require("dotenv").config();
const mongoose = require("mongoose");

const Movie = require("./models/movies");
const movieJson = require("./movies.json");

const start = async () => {
  try {
    // connects to the db
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected");
    console.log("Deleting....");
    //deletes the previous movies in the db
    await Movie.deleteMany();
    console.log("Previous ones deleted");
    await Movie.create(movieJson);
    console.log("Uploading.....");
    //uploads the movies from the moviejson
    console.log("Movie Uploaded Succesfuly");
    //breaks the terminal when it is done
    process.exit(0);
  } catch (error) {
    console.log(error);
    console.log("Unable to Connect");
    process.exit(1);
  }
};

start();
