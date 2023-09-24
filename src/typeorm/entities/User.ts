import { Exclude } from "class-transformer";
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

    @Exclude()
    @Column({
        default: false
    })
    is_admin: boolean;

    @Column({
        default: 100,
    })
    balance: number


}