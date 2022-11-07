import { CustomRequestJwtPayload, CustomRequest } from "./../shared/request";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

export const Auth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authKey = req.headers["authorization"]?.split(" ")[1];
    // console.log(authKey);
    if (!authKey) {
      return res.status(401).json({
        message: "not auth user",
        errors: ["authorization error"],
      });
    } else {
      const secret = <string>process.env.JWT_SECETE;
      const isValideToken = <CustomRequestJwtPayload>(
        await jwt.verify(authKey, secret)
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
