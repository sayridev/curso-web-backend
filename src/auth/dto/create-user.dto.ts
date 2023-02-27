import { IsArray, IsEmail, IsOptional, IsString, MinLength } from "class-validator";


export class CreateUserDto {
    @IsString()
    @MinLength(4)
    name: string;

    @IsString()
    @MinLength(4)
    lastname: string;

    @IsString()
    @MinLength(4)
    @IsOptional()
    user?: string;

    @IsString()
    @MinLength(4)
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsArray()
    roles?: string[];


   
}
