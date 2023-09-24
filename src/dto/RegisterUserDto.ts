import { IsNotEmpty, IsPhoneNumber, MaxLength, MinLength } from "class-validator";

export class RegisterUserDto {

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(16)
    firstname: string;

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(32)
    lastname: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(32)
    @IsPhoneNumber()
    phone_number: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(32)
    password: string;
}