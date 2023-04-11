const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_KEY);
      req.id = decodedToken.id;
      console.log(decodedToken);
      next();
    } else {
      res.render("login");
    }
  } catch (error) {
    console.log(error);
    res.render("login").json({ message: "Invalid credentials!" });
  }
};

module.exports = { auth };
