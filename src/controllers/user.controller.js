import asynchandler from "../utils/asynchandler.js";

export const registerUser = asynchandler(async (req, res, next) => {
  res.status(200).json({
    message: "ok",
  });
});
