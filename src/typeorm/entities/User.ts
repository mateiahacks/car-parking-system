import { Exclude } from "class-transformer";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Car } from "./Car";
import { Reservation } from "./Reservation";

@Entity()
export class User {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'user_id',
    })
    id: number;

    @Column({
        nullable: false,
    })
    firstname: string;

    @Column({
        nullable: false,
    })
    lastname: string;

    @Exclude()
    @Column({
        nullable: false,
    })
    password: string;

    @Column({
        nullable: false,
        unique: true,
    })
    phone_number: string;

    @Column({
        default: false
    })
    is_admin: boolean;

    @JoinColumn()
    @Column({
        default: 100,
    })
    balance: number;
    
    @JoinColumn()
    @OneToMany(() => Car, (car) => car.owner, { cascade: true })
    cars: Car[];

    @JoinColumn()
    @OneToMany(() => Reservation, (reservation) => reservation.user, { cascade: true })
    reservations: Reservation[];

}