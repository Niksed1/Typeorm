import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import {Address} from "./Address";
import {Company} from "./Company";

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    username: string;

    @Column("varchar", {length:300})
    email: string;

    @Column("varchar", {length:100})
    phone: string;

    @Column("varchar", {length:300})
    website: string;

    @ManyToOne(type => Company, company => company.user, {
    cascade: true, })
    company: Company;

    @OneToOne(type => Address, {
    cascade: true, })
    @JoinColumn()
    address: Address;
}
