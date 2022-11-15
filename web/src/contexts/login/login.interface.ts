import {
  UseFormRegister,
  UseFormHandleSubmit,
  FieldErrorsImpl,
  DeepRequired,
} from "react-hook-form"

export interface ILogin {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  auth: boolean
  setAuth: React.Dispatch<React.SetStateAction<boolean>>
  register: UseFormRegister<ILoginRequest>
  handleSubmit: UseFormHandleSubmit<ILoginRequest>
  errors: FieldErrorsImpl<DeepRequired<ILoginRequest>>
  onSubmit: (data: ILoginRequest) => Promise<void>
  userData: IBalanceResponse
  setUserData: React.Dispatch<React.SetStateAction<IBalanceResponse>>
}

export interface ILoginRequest {
  username: string
  password: string
}

export interface ILoginProps {
  children: React.ReactNode
}

export interface IBalanceResponse {
  id: string
  userName: string
  account: {
    id: string
    balance: number
  }
}
