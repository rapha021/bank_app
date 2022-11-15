export interface ITransaction {
  id: string
  value: number
  createdAt: Date
  account: {
    username: string
  }
  type: "cashOut" | "cashIn"
}
