import { Response, ReturnValue } from "./../shared/response";
import bcryptjs from "bcryptjs";
import { AuthDTO } from "./dto/auth.dto";
import User, { IUserModel } from "./model/user";
import { Model } from "mongoose";
import AuthToken from "../shared/authtoken";
import { validate } from "class-validator";

class UsersService {
  private readonly userModel: Model<IUserModel>;
  constructor(InjectModel: Model<IUserModel>) {
    this.userModel = InjectModel;
  }

  public async loginUser(loginDTO: AuthDTO): Promise<ReturnValue> {
    let statusCode: number = 200;
    let response: Response = {};
    try {
      const userData = await this.userModel.findOne({
        username: loginDTO.username,
      });
      
      let token: string;
      
      if (!userData) {
        const newUser = await this.userModel.create({
          username: loginDTO.username,
          password: loginDTO.password,
          role: "USER",
        });
        const saveUser = await newUser.save();
        token = await AuthToken.generateToken({
          email: saveUser.username,
          _id: saveUser._id,
        });
        statusCode = 201;
      } else {
        const comparePassword = await bcryptjs.compare(
          loginDTO.password,
          userData.password
        );
        if (comparePassword) {
          // get token
        } else {
          statusCode = 400;
          response.message = "password is wrong";
        }
        token = await AuthToken.generateToken({
          email: userData.username,
          _id: userData._id,
        });
        statusCode = 200;
      }
      response.token = token;
    } catch (error) {
      statusCode = 500;
      response.message = error.message;
    }
    return { statusCode, response };
  }
}

export default UsersService;
