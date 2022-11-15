import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { ITransaction } from "../components/table"
import { api } from "../services/api"

interface IRequestsProps {
  children: ReactNode
}

interface IRequests {
  transactions: ITransaction[]
}

const RequestsContext = createContext<IRequests>({} as IRequests)

const RequestsProvider = ({ children }: IRequestsProps) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([])

  useEffect(() => {
    api
      .get<ITransaction[]>("/transactions")
      .then((res) => setTransactions(res.data))
  }, [])

  return (
    <RequestsContext.Provider value={{ transactions }}>
      {children}
    </RequestsContext.Provider>
  )
}

export const useRequests = () => useContext(RequestsContext)

export default RequestsProvider
