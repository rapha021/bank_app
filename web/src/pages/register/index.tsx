import { Button, IconButton, InputAdornment, TextField } from "@mui/material"
import { useLogin } from "../../contexts/login/login.context"
import { Container, Form } from "../login/styles"
import { VisibilityOff, Visibility } from "@mui/icons-material"
import CustomButton from "../../components/button"
import { Link, Navigate } from "react-router-dom"
import { useRegister } from "../../contexts/register/register.context"
import { useState } from "react"

const Register = () => {
  const [password, setPassword] = useState(false)

  const { auth } = useLogin()
  const { onSubmit, handleSubmit, register, errors } = useRegister()

  return (
    <Container>
      {auth && <Navigate to="/dashboard" />}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Username"
          variant="outlined"
          placeholder="Insira seu username"
          error={errors.username ? true : false}
          helperText={errors.username?.message}
          {...register("username")}
        />

        <TextField
          label="Senha"
          variant="outlined"
          placeholder="Insira sua senha"
          type="password"
          error={errors.password ? true : false}
          helperText={errors.password?.message}
          {...register("password")}
        />

        <TextField
          label="Confirme sua senha"
          variant="outlined"
          placeholder="Confirme sua senha"
          type="password"
          error={errors.password ? true : false}
          helperText={errors.password?.message}
          {...register("passwordConfirm")}
        />
        <CustomButton variant="contained" size="large" type="submit">
          Registrar-se
        </CustomButton>

        <Link to="/register" style={{ textDecoration: "none" }}>
          <Button variant="outlined" size="large" style={{ width: "100%" }}>
            Voltar para login
          </Button>
        </Link>
      </Form>
    </Container>
  )
}

export default Register
