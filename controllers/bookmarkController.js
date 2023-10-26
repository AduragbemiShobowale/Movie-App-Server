const Movie = require("../models/movies");
const customError = require("../utils/customError");

const allBookmarks = async (req, res) => {
  const { userId } = req.user;
  const bookmark = await Movie.find({ bookmarkedBy: userId });

  res.status(200).json({
    data: bookmark,
  });
};

const addBookmark = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;

  const movie = await Movie.findOneAndUpdate(
    { _id: id },
    { $push: { bookmarkedBy: userId } }
  );

  if (!movie) {
    return next(customError(`No Movie with ID:${id}`, 400));
  }

  res.status(200).json({
    message: "Movie Bookmarked!",
  });
};

const removeBookmark = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;

  const movie = await Movie.findOneAndUpdate(
    { _id: id },
    { $pull: { bookmarkedBy: userId } }
  );

//   const hasBeenBookmarked = await Movie.findOne({
//     _id: id,
//     bookmarkedBy: userId,
//   });

//   if (!hasBeenBookmarked) {
//     return next(customError(`You havent bookmarked this`, 400));
//   }

  if (!movie) {
    return next(customError(`No Movie with ID:${id}`, 400));
  }

  res.status(200).json({
    message: "Bookmark Removed!",
  });
};

module.exports = { allBookmarks, addBookmark, removeBookmark };
