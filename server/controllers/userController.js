import { z } from "zod";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { hashPassword, matchPassword } from "../utils/hashPassword.js";
import User from "../models/userModel.js";
import { createToken } from "../utils/createToken.js";

const userLoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
    ),
});

const userSignupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
    ),
});

export const userLogin = asyncHandler(async (req, res, next) => {
  //   next(new apiError(400, "eror here"));
  // return res.json( new apiResponse( 200, { message: "hiii" } ) );

  const isValid = userLoginSchema.safeParse(req.body);

  if (!isValid.success) {
    return next(new apiError(400, "Invalid Inputs"));
  }
  const existUser = await User.findOne({ email: isValid.data.email }).populate({
    path: "cart",
    populate: "items.product",
  });

  if (!existUser) {
    return next(new apiError(400, "User Not Exist"));
  }

  const isPasswordCorrect = matchPassword(
    isValid.data.password,
    existUser.password
  );

  if (!isPasswordCorrect) {
    return next(new apiError(400, "Credentials are not correct"));
  }

  const acessToken = createToken(existUser._id);

  const { password, ...rest } = existUser._doc;

  return res.json(new apiResponse(200, { user: rest, acessToken }));
});

export const userSignup = asyncHandler(async (req, res, next) => {
  const isValid = userSignupSchema.safeParse(req.body);

  if (!isValid.success) {
    return next(new apiError(400, "Invalid Inputs"));
  }

  const existUser = await User.findOne({ email: isValid.data.email });

  if (existUser) {
    return next(new apiError(400, "User Already Exist"));
  }

  const hashedPassword = hashPassword(isValid.data.password);

  const newUser = new User({
    name: isValid.data.name,
    email: isValid.data.email,
    password: hashedPassword,
  });

  await newUser.save();

  const acessToken = createToken(newUser._id);

  const { password, ...rest } = newUser._doc;

  return res.json(new apiResponse(200, { user: rest, acessToken }));
});
