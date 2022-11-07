import { CustomRequestJwtPayload, CustomRequest } from './../shared/request';
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

export const Auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const authKey = req.headers["authorization"]?.split(" ")[1];
    if (!authKey) {
      return res.status(401).json({
        message: "not auth user",
        errors: ["authorization error"],
      });
    } else {
      const isValideToken = <CustomRequestJwtPayload>await jwt.verify(
        authKey,
        process.env.JWT_SECETE as string
      );
      if (!isValideToken) {
        return res.status(401).json({
          message: "in valide token",
          errors: ["token expired"],
        });
      } else {
        req.user = isValideToken?._id;
        next();
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: "error in auth",
      errors: ["error in auth"],
    });
  }
};
