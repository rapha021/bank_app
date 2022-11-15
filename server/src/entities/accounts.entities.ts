import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Transaction } from "./transactions.entities"

@Entity()
export class Account {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string

  @Column({ default: 100 })
  balance: number

  @OneToMany(() => Transaction, (transaction) => transaction.debitedAccountId)
  debitedAccountId: Transaction[]

  @OneToMany(() => Transaction, (transaction) => transaction.creditedAccountId)
  creditedAccountId: Transaction[]
}
