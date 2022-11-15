import { Grid } from "@mui/material"
import { Navigate } from "react-router-dom"
import Header from "../../components/header"
import SubHeader from "../../components/subHeader"
import Table from "../../components/table"
import { useLogin } from "../../contexts/login.context"
import { useRequests } from "../../contexts/requests.context"

const Dashboard = () => {
  const { transactions } = useRequests()
  const { auth } = useLogin()

  const username = window.localStorage.getItem("@bank:username")
  const balance = window.localStorage.getItem("@bank:balance")

  return (
    <>
      {!auth && <Navigate to="/login" />}
      <Header />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SubHeader name={username} balance={balance} />
        </Grid>

        <Grid item xs={12}>
          <Table data={transactions!} />
        </Grid>
      </Grid>
    </>
  )
}

export default Dashboard
