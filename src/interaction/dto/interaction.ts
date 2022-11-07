import { IsNotEmpty, IsString } from "class-validator";

export class InteractionInputDTO {
  @IsNotEmpty()
  @IsString()
  type: string;

  post?: string;
  comment?: string;

  createdby: string;
}
