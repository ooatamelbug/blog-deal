import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class InteractionInputDTO {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsOptional()
  post?: string;
  @IsOptional()
  comment?: string;

  createdby: string;
}
