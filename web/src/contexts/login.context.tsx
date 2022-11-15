import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { api } from "../services/api"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

interface ILogin {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  auth: boolean
  setAuth: React.Dispatch<React.SetStateAction<boolean>>
  register: UseFormRegister<ILoginRequest>
  handleSubmit: UseFormHandleSubmit<ILoginRequest>
  errors: FieldErrorsImpl<DeepRequired<ILoginRequest>>
  onSubmit: (data: ILoginRequest) => Promise<void>
}

interface ILoginRequest {
  username: string
  password: string
}

interface ILoginProps {
  children: ReactNode
}

export const LoginContext = createContext<ILogin>({} as ILogin)

const LoginProvider = ({ children }: ILoginProps) => {
  const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    api
      .get("/user/balance")
      .then((res) => {
        window.localStorage.setItem("@bank:balance", res.data.balance)
        setAuth(true)
        setLoading(false)
      })
      .catch((err) => {
        setAuth(false)
        setLoading(false)
      })
  }, [])

  const formSchema = yup.object().shape({
    username: yup.string().required("Insira seu username"),
    password: yup.string().required("Insira sua senha"),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginRequest>({ resolver: yupResolver(formSchema) })

  const onSubmit = async (data: ILoginRequest) => {
    setLoading(true)
    await api
      .post("/user/login", {
        username: data.username,
        password: data.password,
      })
      .then((res) => {
        window.localStorage.setItem("@bank:username", data.username)
        window.localStorage.setItem("@bank:token", res.data.token)
        toast.success("Login feito com sucesso!", {
          autoClose: 1500,
          toastId: "loginSuccess",
        })
        setAuth(true)
      })
      .catch((err) => {
        toast.error("username ou senha incorretos", {
          autoClose: 1500,
          toastId: "loginError",
        })
      })
    setLoading(false)
  }

  return (
    <LoginContext.Provider
      value={{
        loading,
        setLoading,
        auth,
        setAuth,
        register,
        handleSubmit,
        errors,
        onSubmit,
      }}
    >
      {children}
    </LoginContext.Provider>
  )
}

export const useLogin = () => useContext(LoginContext)

export default LoginProvider
