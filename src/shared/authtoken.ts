import { AuthDTO } from "./../users/dto/auth.dto";
import * as jwt from "jsonwebtoken";

interface payload {
  _id: string;
  email: string;
}

class AuthToken {
  public static async generateToken(userData: payload): Promise<string> {
    const screte = <string>process.env.JWT_SECETE;
    const token = await jwt.sign(userData, screte, {
      expiresIn: `${process.env.JWT_EXPIRE}d`,
    });
    return token;
  }
  public static async verifyToken(token: string): Promise<string | jwt.JwtPayload> {
    const access = await jwt.verify(token, <string>process.env.JWT_SECETE);
    return access;
  }
}

export default AuthToken;