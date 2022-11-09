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


export class ShowedPostParamDTO {
  role?: string;
  pagenate: number;
  limit: number;
  order: string;
}