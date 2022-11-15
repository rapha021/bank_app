import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Account } from "./accounts.entities"

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string

  @ManyToOne(() => Account, (account) => account.id)
  debitedAccountId: Account

  @ManyToOne(() => Account, (account) => account.id)
  creditedAccountId: Account

  @Column()
  value: number

  @CreateDateColumn()
  createdAt: Date
}
