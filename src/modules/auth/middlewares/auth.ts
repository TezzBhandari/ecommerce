import type { JwtPayload } from "jsonwebtoken";
import type { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import HttpStatusCodes from "../../../constants/HTTPStatusCode";

// JUST SENDS UNAUTHORIZED RESPONSE
const sendUnauthorizedResponse = (res: Response) => {
  res.status(HttpStatusCodes.UNAUTHORIZED).json({
    status: "error",
    message: "unauthorize",
  });
};

/**
 * authorization middleware
 * verifies bearer jwt token from auth header and responds with unauthorized response if it fails to verify the token
 * @param req
 * @param res
 * @param next
 */
const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwtSecret = process.env.JWT_SECRET as string;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      sendUnauthorizedResponse(res);
    } else {
      const tokenParts = authHeader.split(" ");

      if (tokenParts.length !== 2) {
        sendUnauthorizedResponse(res);
        return;
      }

      if (
        tokenParts[0] === "Bearer" ||
        tokenParts[1].match(/\S+\.\S+\.\S+/) !== null
      ) {
        const verification = jwt.verify(tokenParts[1], jwtSecret, {
          algorithms: ["HS256"],
        }) as JwtPayload;

        req.jwt = verification;
        next();
      } else {
        sendUnauthorizedResponse(res);
      }
    }
  } catch (error) {
    console.debug(error);
    next(error);
  }
};

export { auth };
