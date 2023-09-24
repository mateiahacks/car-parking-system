import { IsNotEmpty } from "class-validator";

export class AddCarDto {

    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    state_number: string;

    @IsNotEmpty()
    type: string;

}