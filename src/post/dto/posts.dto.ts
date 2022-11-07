import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class PostInputDTO {
  @IsNotEmpty()
  title: string;
  body: string;
  status: string;
  @IsNotEmpty()
  createdby: string;
}

