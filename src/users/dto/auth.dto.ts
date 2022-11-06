import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthDTO {
    @IsEmail()
    @IsNotEmpty()
    username: string;
    
    @IsNotEmpty()
    password: string;
}