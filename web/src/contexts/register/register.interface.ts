import {
  DeepRequired,
  FieldErrorsImpl,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form"

export interface IRegister {
  register: UseFormRegister<IRegisterRequest>
  handleSubmit: UseFormHandleSubmit<IRegisterRequest>
  errors: FieldErrorsImpl<DeepRequired<IRegisterRequest>>
  onSubmit: (data: IRegisterRequest) => Promise<void>
}

export interface IRegisterProps {
  children: React.ReactNode
}

export interface IRegisterRequest {
  username: string
  password: string
  passwordConfirm: string
}
