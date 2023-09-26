import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reservation } from "./Reservation";

@Entity()
export class Parking {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'parking_id'
    })
    id: number;

    @Column({
        nullable: false,
        unique: true,
    })
    name: string;

    @Column({
        nullable: false,
    })
    address: string;

    @Column({
        nullable: false,
    })
    cost: number;

    @OneToMany(() => Reservation, (reservation) => reservation.parking, { cascade: true })
    reservations: Reservation[]
    
}