import { Button, IconButton, InputAdornment, TextField } from "@mui/material"
import { useState } from "react"
import { useLogin } from "../../contexts/login/login.context"
import { Container, Form } from "./styles"
import { VisibilityOff, Visibility } from "@mui/icons-material"
import CustomButton from "../../components/button"
import { Link, Navigate } from "react-router-dom"

const Login = () => {
  const { register, onSubmit, errors, handleSubmit, auth } = useLogin()
  const [password, setPassword] = useState(false)

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
          label="Password"
          variant="outlined"
          placeholder="Insira sua senha"
          type={password ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setPassword(!password)}>
                  {password ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={errors.password ? true : false}
          helperText={errors.password?.message}
          {...register("password")}
        />
        <CustomButton variant="contained" size="large" type="submit">
          Login
        </CustomButton>

        <Link to="/register" style={{ textDecoration: "none" }}>
          <Button variant="outlined" size="large" style={{ width: "100%" }}>
            Registrar-se
          </Button>
        </Link>
      </Form>
    </Container>
  )
}

export default Login
