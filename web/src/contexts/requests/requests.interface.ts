import {
  DeepRequired,
  FieldErrorsImpl,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form"
import { ITransaction } from "../../interfaces/transaction.interface"

export interface IRequestsProps {
  children: React.ReactNode
}

export interface IRequests {
  transactions: ITransaction[]
  register: UseFormRegister<ITransactionRequest>
  handleSubmit: UseFormHandleSubmit<ITransactionRequest>
  errors: FieldErrorsImpl<DeepRequired<ITransactionRequest>>
  onSubmit: (data: ITransactionRequest) => Promise<void>
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ITransactionRequest {
  username: string
  value: number
}
