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

  @Column({ type: "float8" })
  value: number

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date
}
