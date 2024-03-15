// import "express";

// // **** Declaration Merging **** //

// declare module "express" {
//   export interface Request {
//     jwt: any;
//   }
// }

import "http";
import "jsonwebtoken";
import "express";

// import { Request } from "express";

interface JwtPayloadData {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
}

// jwt verification payload
declare module "jsonwebtoken" {
  interface JwtPayload {
    MetaData: JwtPayloadData;
  }
}

import type { JwtPayload } from "jsonwebtoken";
// express request object
declare global {
  namespace Express {
    interface Request {
      jwt: JwtPayload;
      smtpEmail: {
        email: string;
        otp: string;
      };
    }
  }
}

// import { IncomingHttpHeaders } from "http";
// import type { Jwt } from "jsonwebtoken";

declare module "http" {
  interface IncomingHttpHeaders {
    "refresh-token": string;
  }
}

export type { JwtPayloadData };
