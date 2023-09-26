import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Parking } from "./Parking";
import { User } from "./User";
import { Car } from "./Car";

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

    @ManyToOne(() => User, (user) => user.reservations)
    user: User

    @OneToOne(() => Car, (car) => car.reservation)
    car: Car;

    @ManyToOne(() => Parking, (parking) => parking.reservations)
    parking: Parking;

}