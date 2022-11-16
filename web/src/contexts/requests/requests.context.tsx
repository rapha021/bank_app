import { createContext, useContext, useEffect, useState } from "react"
import { ITransaction } from "../../interfaces/transaction.interface"
import * as yup from "yup"

import { api } from "../../services/api"
import {
  IRequests,
  IRequestsProps,
  ITransactionRequest,
} from "./requests.interface"
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { useLogin } from "../login/login.context"

const RequestsContext = createContext<IRequests>({} as IRequests)

const RequestsProvider = ({ children }: IRequestsProps) => {
  const { loading, setLoading } = useLogin()

  const [modal, setModal] = useState(false)
  const [transactions, setTransactions] = useState<ITransaction[]>([])

  useEffect(() => {
    api
      .get<ITransaction[]>("/transactions")
      .then((res) => setTransactions(res.data))
  }, [loading])

  const formSchema = yup.object().shape({
    username: yup.string().required("Insira seu username"),
    value: yup.number().required("Insira o valor"),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITransactionRequest>({ resolver: yupResolver(formSchema) })

  const onSubmit = async (data: ITransactionRequest) => {
    setLoading(true)
    await api
      .post("/transactions/cashout", {
        username: data.username,
        value: data.value,
      })
      .then((res) => {
        setModal(false)
        toast.success("Transferência feita com sucesso!", {
          autoClose: 1500,
        })
      })
      .catch((err) => {
        if (err.response.data.message === "You cant send money to yourself") {
          toast.error("Você não pode mandar dinheiro para si mesmo", {
            autoClose: 1500,
          })
        } else if (err.response.data.message === "Insuficient balance") {
          toast.error("Saldo insuficiente", {
            autoClose: 1500,
          })
        } else {
          toast.error("Username inválido", {
            autoClose: 1500,
          })
        }
      })
    setLoading(false)
  }

  return (
    <RequestsContext.Provider
      value={{
        transactions,
        register,
        onSubmit,
        handleSubmit,
        errors,
        setModal,
        modal,
      }}
    >
      {children}
    </RequestsContext.Provider>
  )
}

export const useRequests = () => useContext(RequestsContext)

export default RequestsProvider
