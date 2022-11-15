import { Avatar, Typography } from "@mui/material"
import { IBalanceResponse } from "../../contexts/login/login.interface"
import { Container, Div } from "./styles"

interface IubHeaderProps {
  userData: IBalanceResponse
}

const SubHeader = ({ userData }: IubHeaderProps) => {
  return (
    <Container>
      <Avatar alt={userData.userName} sx={{ backgroundColor: "#1976d2" }}>
        {userData.userName[0]}
      </Avatar>
      <Div>
        <Typography variant="h5">Olá, {userData.userName}</Typography>
        <Typography variant="caption">
          Seu saldo é: R${userData.account.balance.toFixed(2).replace(".", ",")}
        </Typography>
      </Div>
    </Container>
  )
}

export default SubHeader
