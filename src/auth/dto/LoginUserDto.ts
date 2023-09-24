import { IsNotEmpty, IsPhoneNumber } from "class-validator";

export class LoginUserDto {

    @IsNotEmpty()
    @IsPhoneNumber()
    phone_number: string;

    @IsNotEmpty()
    password: string;
}