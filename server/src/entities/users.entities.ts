import { Exclude } from "class-transformer"
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Account } from "./accounts.entities"

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string

  @Column({ unique: true })
  userName: string

  @Column()
  @Exclude()
  password: string

  @OneToOne((type) => Account, {
    eager: true,
  })
  @JoinColumn()
  account: Account
}
