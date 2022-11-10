import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import mongoose from "mongoose";

export class PostInputDTO {
  @IsNotEmpty()
  @IsString()
  title: string;
  body: string;
  status: string;
  @IsString()
  @IsNotEmpty()
  createdby: string;
}


export class ShowedPostParamDTO {
  role?: string;
  pagenate: number;
  limit: number;
  order: string;
}

export class StatusPostDTO {
  @IsNotEmpty()
  @IsString()
  id : string;
  @IsNotEmpty()
  @IsString()
  @IsEnum(["APPROVED", "REJECTED", "PENDING"])
  status : string;
}