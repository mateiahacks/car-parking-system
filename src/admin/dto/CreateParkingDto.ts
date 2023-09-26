import { IsNotEmpty } from "class-validator";

export class createParkingDto {
    
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    cost: number;
}