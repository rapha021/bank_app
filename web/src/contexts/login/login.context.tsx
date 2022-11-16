import { createContext, useContext, useEffect, useState } from "react"
import { api } from "../../services/api"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import {
  IBalanceResponse,
  ILogin,
  ILoginProps,
  ILoginRequest,
} from "./login.interface"
import { useNavigate } from "react-router-dom"

export const LoginContext = createContext<ILogin>({} as ILogin)

const LoginProvider = ({ children }: ILoginProps) => {
  const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState(false)
  const [userData, setUserData] = useState<IBalanceResponse>(
    {} as IBalanceResponse
  )

  const navigate = useNavigate()

  useEffect(() => {
    const verifySession = async () => {
      await api
        .get<IBalanceResponse>("/user/balance")
        .then((res) => {
          setUserData(res.data)
          setAuth(true)
          setLoading(false)
        })
        .catch((err) => {
          setAuth(false)
          setLoading(false)
        })
    }
    verifySession()
  }, [loading])

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
        window.localStorage.setItem("@bank:token", res.data.token)
        toast.success("Login feito com sucesso!", {
          autoClose: 1500,
          toastId: "loginSuccess",
        })
        window.location.reload()
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
        userData,
        setUserData,
      }}
    >
      {children}
    </LoginContext.Provider>
  )
}

export const useLogin = () => useContext(LoginContext)

export default LoginProvider
