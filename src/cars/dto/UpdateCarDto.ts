import { IsNotEmpty } from "class-validator";

export class UpdateCarDto {

    name: string;
    
    state_number: string;

    type: string;

}