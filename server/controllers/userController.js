import { z } from "zod";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { hashPassword, matchPassword } from "../utils/hashPassword.js";
import User from "../models/userModel.js";
import { createToken } from "../utils/createToken.js";
import { validateEmailOrPhone } from "../utils/helper.js";

const userLoginSchema = z.object({
  emailOrPhone: z.string().refine((value) => {
    const result = validateEmailOrPhone(value);
    return result !== "unknown";
  }),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
    ),
});

const userSignupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().regex(/^[6-9]{1}[0-9]{9}$/),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
    ),
});

export const userLogin = asyncHandler(async (req, res, next) => {
  // next(new apiError(400, "eror here"));
  // return res.json( new apiResponse( 200, { message: "hiii" } ) );

  const isValid = userLoginSchema.safeParse(req.body);

  if (!isValid.success) {
    return next(new apiError(400, "Invalid Inputs"));
  }
  const existUser = await User.findOne({
    [validateEmailOrPhone(isValid.data.emailOrPhone)]:
      isValid.data.emailOrPhone,
  }).populate({
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
    phone: isValid.data.phone,
    password: hashedPassword,
  });

  await newUser.save();

  const acessToken = createToken(newUser._id);

  const { password, ...rest } = newUser._doc;

  return res.json(new apiResponse(200, { user: rest, acessToken }));
});

export const auth = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({
    path: "cart",
    populate: "items.product",
  });

  return res.json(new apiResponse(200, user));
});
