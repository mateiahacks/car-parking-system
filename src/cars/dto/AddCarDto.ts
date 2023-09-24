import { IsNotEmpty } from "class-validator";

export class AddCarDto {

    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    stateNumber: string;

    @IsNotEmpty()
    type: string;

}