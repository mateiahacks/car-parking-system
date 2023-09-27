import { Exclude } from "class-transformer";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Reservation } from "./Reservation";

@Entity()
export class Car {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'car_id',
    })
    id: number;

    @Column({
        nullable: false,
    })
    name: string;

    @Column()
    state_number: string;

    @Column()
    type: string;

    @JoinColumn()
    @ManyToOne(() => User, (user) => user.cars)
    owner: User;

    @OneToMany(() => Reservation, (reservation) => reservation.car)
    reservations: Reservation[];

}