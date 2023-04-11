const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  likeSong,
  makeArtists,
  makeSongs,
  followArtist,
  homePage,
  renderLogin,
  favoriteSongs,
  searchPage,
  renderRegister,
  renderUserInfo,
} = require("../controllers/UserControllers");
const { auth } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/login", renderLogin);
router.get("/register", renderRegister);
router.get("/", auth, homePage);
router.post("/logout", logoutUser);
router.get("/info", auth, renderUserInfo);
router.put("/info", auth, updateUser);
router.get("/songs", auth, favoriteSongs);
router.get("/search", auth, searchPage);
router.post("/songs/like", auth, likeSong);
router.post("/artist/follow", auth, followArtist);
router.post("/artists", makeArtists);
router.post("/songs", makeSongs);

module.exports = router;
