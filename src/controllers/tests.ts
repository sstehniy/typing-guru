import express from "express";
const router = express.Router();
import Test from "../models/Test";
import User from "../models/User";
import validateToken from "../utils/getTokenFromRequest";
import { ICreateTestRequest, IGetUserTestsRequest } from "../types";

router.use(validateToken);

router.get("/", async (req, res, next) => {
  try {
    const allTests = await Test.find({}, { updatedAt: 0 }).populate("user", "username");
    res.status(200).json(allTests.map(t => t.toJSON())); //eslint-disable-line
  } catch (error) {
    next({ status: 500, message: "Failed to fetch the resource" });
  }
});

router.post("/", async (req: ICreateTestRequest, res, next) => {
  const { data, decodedToken } = req.body;
  const { wpm, cpm, acc, score, username } = data;
  if (!username || username !== decodedToken.username)
    return next({ status: 401, message: "Token malformed" });
  try {
    const user = await User.findById(decodedToken.id);
    const newTest = new Test({
      wpm,
      cpm,
      acc,
      score,
      user: user._id, //eslint-disable-line
    });
    const savedTest = await newTest.save();
    user.tests = user.tests.concat(savedTest._id); //eslint-disable-line
    await user.save();
    res.status(201).json(savedTest.toJSON());
  } catch (error) {
    return next({
      status: 409,
      message: "Failed to create resource",
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: error,
    });
  }
});

router.get("/user/:userId", async (req: IGetUserTestsRequest, res, next) => {
  const { userId } = req.params;
  const { decodedToken } = req.body;
  if (userId !== decodedToken.id)
    return next({ status: 401, message: "Token malformed" });
  try {
    const allTests = await Test.find(
      { user: decodedToken.id },
      { updatedAt: 0 }
    ).populate("user", "username");
    res.status(200).json(allTests.map(t => t.toJSON())); // eslint-disable-line
  } catch (error) {
    next({ status: 500, message: "Failed to fetch the resource" });
  }
});

export default router;
