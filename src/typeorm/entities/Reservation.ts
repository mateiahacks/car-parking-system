import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @JoinColumn()
    @ManyToOne(() => User, (user) => user.reservations)
    user: User

    @JoinColumn()
    @ManyToOne(() => Car, (car) => car.reservations)
    car: Car;

    @JoinColumn()
    @ManyToOne(() => Parking, (parking) => parking.reservations)
    parking: Parking;

}