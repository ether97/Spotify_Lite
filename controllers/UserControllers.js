const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Song = require("../models/Song");
const Artist = require("../models/Artist");
const bcrypt = require("bcryptjs");
const Artists = require("../config/Artists.json");
const Songs = require("../config/Songs.json");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!validateEmail(email)) res.json({ Error: "Invalid email!" });

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).json({ Error: "user doesn't exist!" });
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    console.log("hi");
    let token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
    res
      .status(200)
      .cookie("token", token, { maxAge: 360000000 })
      .json({ message: "Success" });
  } else {
    res.json({ Error: "Invalid login!" });
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie("token").json({ message: "Success" });
};

const homePage = async (req, res) => {
  const allSongs = await Song.find({});
  const _id = req.id;
  const user = await User.findOne({ _id });
  const newUser = await user.populate("likedSongs");
  const artists = await Artist.find();
  const songs = newUser.likedSongs;
  console.log(newUser);
  res.render("homePage", { songs, allSongs, user, artists });
};

const renderRegister = async (req, res) => {
  res.render("registerPage");
};

const searchPage = async (req, res) => {
  let { title, language, artist } = req.query;
  const _id = req.id;
  const user = await User.findOne({ _id });
  const songsWithTitle = await Song.find({ title });
  const songsWithLanguage = await Song.find({ language });
  const songsWithArtist = await Song.find({ artist });
  if (
    (title && songsWithTitle.length === 0) ||
    (language && songsWithLanguage.length === 0) ||
    (artist && songsWithArtist.length === 0)
  ) {
    res.render("searchPage", {
      basic: true,
      username: user.username,
      songNotFound: true,
    });
  }
  console.log(title);
  if (!title && !language && !artist) {
    res.render("searchPage", {
      basic: true,
      username: user.username,
      songNotFound: false,
    });
  } else if (title) {
    if (language) {
      const songs = await Song.find({
        title,
        language,
      });
      console.log(songs);
      res.render("searchPage", {
        basic: false,
        songs,
        username: user.username,
        songNotFound: false,
      });
    } else if (artist) {
      const songs = await Song.find({
        title,
        artist,
      });
      console.log(songs);
      res.render("searchPage", {
        basic: false,
        songs,
        username: user.username,
        songNotFound: false,
      });
    } else {
      const songs = await Song.find({
        title,
      });
      console.log(songs);
      res.render("searchPage", {
        basic: false,
        songs,
        username: user.username,
        songNotFound: false,
      });
    }
  } else if (language) {
    if (title) {
      const songs = await Song.find({
        title,
        language,
      });
      console.log(songs);
      res.render("searchPage", {
        basic: false,
        songs,
        username: user.username,
        songNotFound: false,
      });
    } else if (artist) {
      const songs = await Song.find({
        language,
        artist,
      });
      console.log(songs);
      res.render("searchPage", {
        basic: false,
        songs,
        username: user.username,
        songNotFound: false,
      });
    } else {
      const songs = await Song.find({
        language,
      });
      console.log(songs);
      res.render("searchPage", {
        basic: false,
        songs,
        username: user.username,
        songNotFound: false,
      });
    }
  } else if (artist) {
    if (language) {
      const songs = await Song.find({
        artist,
        language,
      });
      console.log(songs);
      res.render("searchPage", {
        basic: false,
        songs,
        username: user.username,
        songNotFound: false,
      });
    } else if (title) {
      const songs = await Song.find({
        title,
        artist,
      });
      console.log(songs);
      res.render("searchPage", {
        basic: false,
        songs,
        username: user.username,
        songNotFound: false,
      });
    } else {
      const songs = await Song.find({
        artist,
      });
      console.log(songs);
      res.render("searchPage", {
        basic: false,
        songs,
        username: user.username,
        songNotFound: false,
      });
    }
  }
};

const favoriteSongs = async (req, res) => {
  const _id = req.id;
  const user = await User.findOne({ _id });
  const newUser = await user.populate("likedSongs");
  const songs = newUser.likedSongs;
  console.log(newUser);
  res.render("favoriteSongs", { songs, user });
};

const registerUser = async (req, res) => {
  const { username, password, email } = req.body;

  // If the username, password or email is invalid: (numbers not strings etc)
  if (!username || !password || !email) {
    res.status(400).json({ Error: "Invalid input!" });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ Error: "User already exists!" });
  }

  if (!validateEmail(email)) res.json({ Error: "Invalid email!" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    let token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
    res
      .cookie("token", token, { maxAge: 36000000 })
      .json({ message: "Success" });
  } else {
    res.status(400).json({ Error: "Invalid user info" });
  }
};

const renderUserInfo = async (req, res) => {
  const _id = req.id;
  const user = await User.findOne({ _id });
  res.render("updateInfo", { email: user.email, username: user.username });
};

const validateEmail = (email) => {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(mailformat)) {
    return true;
  }
  return false;
};

const updateUser = async (req, res) => {
  const { email, password, username } = req.body;
  const _id = req.id;
  const user = await User.findOne({ _id });

  if (!validateEmail(email)) res.json({ Error: "Invalid email!" });

  if (!email && !username && !password) {
    res.json({ Error: "No new data entered, nothing updated!" });
  }
  let hashedNewPassword;

  if (password) {
    const salt = await bcrypt.genSalt(10);
    hashedNewPassword = await bcrypt.hash(password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      email: email ? email : user.email,
      password: password ? hashedNewPassword : user.password,
      username: username ? username : user.username,
    },
    { new: true }
  );
  res.json({ message: "Success" });
};

const getUsers = async (req, res) => {
  const allUsers = await User.find();

  res.json(allUsers);
};

const likeSong = async (req, res) => {
  const { title } = req.body;
  const _id = req.id;
  // const { _id } = req.user;
  console.log(req.body, _id);
  const song = await Song.findOne({ title });
  console.log(song);
  const songExists = await User.find({ likedSongs: { $in: [song._id] } });
  if (songExists.length === 0) {
    const user = await User.findByIdAndUpdate(
      _id,
      {
        $push: { likedSongs: song._id },
      },
      { new: true }
    );

    res.json({ message: "Song successfully liked!" });
  } else {
    res.json({ error: "Song already liked!" });
  }
  // if (user) {
  //   res.json({ message: "Success!" });
  // }
};

const followArtist = async (req, res) => {
  const { name } = req.body;
  // const { _id } = req.user;
  const _id = req.id;
  const artist = await Artist.findOne({ name });
  const artistExists = await User.find({ follows: { $in: [artist._id] } });

  if (artistExists.length === 0) {
    const user = await User.findByIdAndUpdate(
      _id,
      {
        $push: { follows: artist._id },
      },
      { new: true }
    );

    res.json({ message: "Artist successfully followed!" });
  } else {
    res.json({ error: "You already follow them!" });
  }
  // if (user) {
  //   res.json({ message: "Success!" });
  // }
};

const makeArtists = async (req, res) => {
  for (let i = 0; i < Artists.length; i++) {
    await Artist.create(Artists[i]);
  }
  console.log("Done!");
};

const makeSongs = async (req, res) => {
  for (let i = 0; i < Songs.length; i++) {
    await Song.create(Songs[i]);
  }
  console.log("Done!");
};

const renderLogin = async (req, res) => {
  res.render("login");
};

module.exports = {
  loginUser,
  logoutUser,
  updateUser,
  registerUser,
  getUsers,
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
};
