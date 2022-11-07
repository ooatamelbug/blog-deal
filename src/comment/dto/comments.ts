import { IsNotEmpty, IsString } from "class-validator";

export class CommentInputDTO {
  @IsNotEmpty()
  @IsString()
  body: string;

  @IsNotEmpty()
  @IsString()
  post: string;

  createdby: string;
}
