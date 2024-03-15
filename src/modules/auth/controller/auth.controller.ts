import type { Request, Response, NextFunction } from "express";
import HttpStatusCodes from "../../../constants/HTTPStatusCode";
import type { LoginRequestBody, UserRegistrationRequestBody } from "../types";
import { User } from "../../../models/users";
import createHttpError from "http-errors";
import * as argon2 from "argon2";
import { issueJWT } from "../utils/jwt";

const login = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    // TODO: check if the user exists in the database
    const user = await User.findOne({ email });

    console.debug("loginUserExist: ", user);
    if (user === null) {
      return next(
        createHttpError(HttpStatusCodes.NOT_FOUND, "user doesn't exist")
      );
    }

    // match the password
    const matchedPassword = await argon2.verify(user.password, password);

    if (matchedPassword === false) {
      return next(
        createHttpError(HttpStatusCodes.BAD_REQUEST, "incorrect password")
      );
    }

    // TODO generate refresh and access token

    const accessToken = issueJWT({
      user: {
        fullname: user.fullname,
        email: user.email,
        id: user._id.toString(),
        isEmailVerified: user.isEmailVerified,
      },
      options: {
        expiresIn: 15 * 60,
      },
    });

    const refreshToken = issueJWT({
      user: {
        fullname: user.fullname,
        email: user.email,
        id: user._id.toString(),
        isEmailVerified: user.isEmailVerified,
      },
      options: {
        expiresIn: "2d",
      },
    });

    res.status(HttpStatusCodes.OK).json({
      status: "success",
      accessToken: accessToken,
      refreshToken,
      message: "successfully logged in",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const register = async (
  req: Request<{}, {}, UserRegistrationRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    // inser the user into the database
    const { email, address, fullname, password, phoneNumber } = req.body;

    // check if the user exists in the database;
    const userExists = await User.findOne({ email });
    if (userExists !== null) {
      return next(
        createHttpError(
          HttpStatusCodes.CONFLICT,
          `user: ${email} already exists`
        )
      );
    }
    console.log("userexist", userExists);

    const hashedPassword = await argon2.hash(password);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      fullname,
      address,
      phoneNumber,
    });
    console.log("user ", newUser);

    res.status(HttpStatusCodes.OK).json({
      status: "success",
      otpSessionId: "here you gonna get a otp session id",
      message: "successfully created account in",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { login, register };
