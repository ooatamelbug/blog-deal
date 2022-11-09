import { NextFunction, Response } from "express";
import { CustomRequest } from "./../shared/request";

export const IsAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const role = req.role;
    if (!role) {
      return res.status(401).json({
        message: "not authorization to enter here",
        errors: ["authorization error"],
      });
    } else {
      if (role != "ADMIN") {
        return res.status(401).json({
          message: "not authorization to enter here",
          errors: ["authorization error"],
        });
      } else {
        next();
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: "error in authorization",
      errors: ["error in authorization"],
    });
  }
};
