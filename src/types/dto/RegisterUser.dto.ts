import { IsNotEmpty, IsPhoneNumber, MinLength } from "class-validator";

export class RegisterUserDto {

    @IsNotEmpty()
    @MinLength(2)
    firstname: string;

    @IsNotEmpty()
    @MinLength(3)
    lastname: string;

    @IsPhoneNumber()
    phone_number: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;
}