import { yupResolver } from "@hookform/resolvers/yup"
import { createContext, useContext } from "react"
import { useForm } from "react-hook-form"
import { useLogin } from "../login/login.context"
import {
  IRegister,
  IRegisterProps,
  IRegisterRequest,
} from "./register.interface"
import * as yup from "yup"
import { api } from "../../services/api"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const RegisterContext = createContext<IRegister>({} as IRegister)

const RegisterProvider = ({ children }: IRegisterProps) => {
  const { loading, setLoading, auth, setAuth } = useLogin()

  const navigate = useNavigate()

  const formSchema = yup.object().shape({
    username: yup
      .string()
      .required("Insira seu username")
      .min(3, "No minimo 3 caracteres"),
    password: yup
      .string()
      .required("Insira sua senha")
      .matches(/(?=.+[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}/),
    passwordConfirm: yup.string().oneOf([yup.ref("password")]),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterRequest>({ resolver: yupResolver(formSchema) })

  const onSubmit = async (data: IRegisterRequest) => {
    setLoading(true)
    await api
      .post("user/register", {
        username: data.username,
        password: data.password,
      })
      .then((res) => {
        toast.success("Cadastro feito com sucesso!", {
          autoClose: 1500,
          toastId: "registerSuccess",
        })
        navigate("/login")
      })
      .catch((err) => {
        toast.error("Houve um problema ao realizar seu cadastro", {
          autoClose: 1500,
          toastId: "registerError",
        })
      })
    setLoading(false)
  }

  return (
    <RegisterContext.Provider
      value={{ register, errors, handleSubmit, onSubmit }}
    >
      {children}
    </RegisterContext.Provider>
  )
}

export const useRegister = () => useContext(RegisterContext)

export default RegisterProvider
