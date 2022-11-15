import { Button } from "@mui/material"
import { useLogin } from "../../contexts/login/login.context"

const Header = () => {
  const { setAuth } = useLogin()

  const handleLogout = () => {
    localStorage.clear()
    setAuth(false)
  }

  return (
    <div
      style={{
        height: "50px",
        backgroundColor: "#fff",
        boxShadow: "4px 19px 15px -3px rgba(0,0,0,0.1)",
        display: "flex",
        justifyContent: "right",
        alignItems: "center",
        padding: "0 10px",
        margin: "0 0 80px 0",
      }}
    >
      <Button variant="outlined" onClick={() => handleLogout()}>
        LogOut
      </Button>
    </div>
  )
}

export default Header
