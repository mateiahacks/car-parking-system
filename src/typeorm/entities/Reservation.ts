import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Parking } from "./Parking";

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'reservation_id',
    })
    id: number;

    @Column({
        type: 'datetime',
        default: () => 'NOW()',
    })
    creation_date: string;

    @Column({
        type: 'datetime',
    })
    expiration_date: string;



    @ManyToOne(() => Parking, (parking) => parking.reservations)
    parking: Parking;

}