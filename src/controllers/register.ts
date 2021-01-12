/* eslint-disable @typescript-eslint/ban-ts-comment */
import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import User from "../models/User";
import { IRegisterRequest } from "../types";
router.post("/", async (req: IRegisterRequest, res, next) => {
  console.log(req.body);
  const { data: creds } = req.body;
  const { fullName, email, username, password } = creds;

  if (!fullName || !email || !username || !password) {
    const missingParams = Object.keys(creds)
      // @ts-ignore
      .map(key => (!creds[key] ? key : null))
      .filter(value => !!value);
    return next({
      status: 422,
      message: "Some required parameters are missing",
      data: missingParams,
    });
  }

  /*   const userExists = await User.find({ $or: [{ email }, { username }] });
  if (userExists.length) {
    return next({
      status: 409,
      message: 'Either email or username are already registered',
    });
  } */

  const SALT = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, SALT);

  try {
    const newUser = new User({
      fullName,
      email,
      username,
      passwordHash,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    next({ status: 409, message: "Registration error", data: error }); // eslint-disable-line
  }
});

export default router;
