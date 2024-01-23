import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

// // login
export const login = async (req, res, next) => {
  try {

    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));
    const isPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!isPassword) return next(createError(400, "wrong password"));


    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.TOKEN, { expiresIn: '10h' })

    const { password, isAdmin, ...otherDetails } = user._doc;
    res.cookie("access_token", token, {
      httpOnly: true
    })
      .status(200)
      .json({
        message: "user sigin successfully",
        data: otherDetails
      })

  } catch (err) {
    next(err)
  }

}


// register  
export const register = async (req, res, next) => {


  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = await User({
      username: req.body.username,
      email: req.body.email,
      password: hash
    });

    await newUser.save();
    res.status(200).json({
      message: "user has been created",
      data: newUser
    });

  } catch (err) {
    next(err);
  }
}