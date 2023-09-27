import { IsNotEmpty } from "class-validator";

export class CreateReservationDto {
    
    @IsNotEmpty()
    hours: number;

    @IsNotEmpty()
    carId: number;

    @IsNotEmpty()
    parkingId: number;

}