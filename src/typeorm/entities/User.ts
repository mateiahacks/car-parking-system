import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'user_id',
    })
    @Exclude()
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
    
    @Exclude()
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

    @Column({
        default: 100,
    })
    balance: number


}