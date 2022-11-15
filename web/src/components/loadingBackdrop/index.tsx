import { Backdrop, CircularProgress } from "@mui/material"
import { useLogin } from "../../contexts/login/login.context"

const LoadingBackdrop = () => {
  const { loading } = useLogin()

  return (
    <>
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
    </>
  )
}

export default LoadingBackdrop
