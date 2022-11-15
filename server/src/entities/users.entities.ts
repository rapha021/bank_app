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
  password: string

  @OneToOne((type) => Account, {
    eager: true,
  })
  @JoinColumn()
  account: Account
}
