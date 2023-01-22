import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  //   const token = req.header("Authorization").replace("Bearer ", "");
  const token = req.header("Authorization").substring(7);
  if (token) {
    try {
      const jwtPayload = jwt.verify(token, process.env.JWT_SECRET);

      // select method removes the password field from the user
      const user = await User.findById(jwtPayload.id).select("-password");

      req.user = user;
      next();
    } catch (error) {
      console.log("ahaha");
      res.status(401);
      throw new Error("Not authorised, illegal token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
