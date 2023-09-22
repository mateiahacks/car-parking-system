import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({
        nullable: false,
    })
    password: string;

    @Column({
        nullable: false
    })
    phone_number: string;

    @Column({
        default: false
    })
    is_admin: boolean;

    @Column({
        default: 100,
    })
    balance: number


}