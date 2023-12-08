import ApiError from "../utils/ApiError.js";
import asynchandler from "../utils/asynchandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";

export const registerUser = asynchandler(async (req, res, next) => {
  // return console.log(req.body);
  const { userName, fullName, email, password } = req.body;

  //some operator is a kind of or operator
  //return true is at least one field in empty
  if (
    [userName, fullName, email, password].some((e) => {
      e?.trim() === "";
    })
  ) {
    throw new ApiError(404, "All feild is required");
  }

  //some operator is a kind of or operator
  //return true is at least one field in empty
  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with eamil or username exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    userName: userName.toLowerCase(),
    fullName,
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registering the user");
  }
  return res.status(201).json(new ApiResponse(201, createdUser, "User registered"));
});
