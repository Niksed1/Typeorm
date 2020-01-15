import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class Company {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    catchPhrase: string;

    @Column()
    bs: string;

    @OneToMany(type => User, user => user.company)
    user: User[];

}