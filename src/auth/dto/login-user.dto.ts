import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginUserDto {
    @IsString()
    @MinLength(4)
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;
}