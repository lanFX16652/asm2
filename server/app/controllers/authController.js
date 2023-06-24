import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signJWT = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
};

const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);

    //Create new user
    const newUser = await new User({
      username: req.body.username,
      password: hashed,
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
    });

    //Save to DB
    const user = await newUser.save();
    const accessToken = signJWT(user.toObject());

    res.status(201).json({ accessToken, user: user });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const logIn = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
  .then((user) => {
    if (!user) {
      return res.status(400).json({ message: "Email/Mat Khau khong hop le" });
    }

    bcrypt
      .compare(password, user.password)
      .then((doMatch) => {
        if (doMatch) {
          const accessToken = signJWT(user.toObject());
          res.status(200).json({ accessToken, user });
        } else {
          return res
            .status(400)
            .json({ message: "Email/Mat Khau khong hop le" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Server khong hoat dong" });
      });
  });
};

const adminLogIn = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
  .then((user) => {
    if (!user) {
      return res.status(400).json({ message: "Email/Mat Khau khong hop le" });
    }

    bcrypt
      .compare(password, user.password)
      .then((doMatch) => {
        if (doMatch) {
          if (!user.isAdmin) {
            return res.status(400).json({ message: "Ban khong phai admin" });
          }

          const accessToken = signJWT(user.toObject());
          res.json({ accessToken, user });
        } else {
          return res
            .status(400)
            .json({ message: "Email/Mat Khau khong hop le" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Server khong hoat dong" });
      });
  });
};



export { register, logIn, adminLogIn };
