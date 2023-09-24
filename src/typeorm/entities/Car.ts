import { Exclude } from "class-transformer";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Car {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'car_id',
    })
    @Exclude()
    id: number;

    @Column()
    name: string;

    @Column()
    state_number: string;

    @Column()
    type: string;

    @ManyToOne(() => User, (user) => user.cars)
    @JoinColumn()
    owner: User;
}