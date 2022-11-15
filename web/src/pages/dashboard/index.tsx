import { Button, Grid } from "@mui/material"
import { useState } from "react"
import { Navigate } from "react-router-dom"
import Header from "../../components/header"
import Modal from "../../components/modal"
import SubHeader from "../../components/subHeader"
import TableComponent from "../../components/table"
import { useLogin } from "../../contexts/login/login.context"
import { useRequests } from "../../contexts/requests/requests.context"
import { Container } from "./styles"

const Dashboard = () => {
  const { transactions, modal, setModal } = useRequests()
  const { auth, userData, loading } = useLogin()

  return (
    <>
      {!auth && <Navigate to="/login" />}
      {modal && <Modal setModal={setModal} />}
      <Header />
      <Container>
        <Grid
          container
          spacing={2}
          sx={{
            ".MuiGrid-item": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            maxWidth: 800,
          }}
        >
          <Grid item xs={12} md={6}>
            {userData.id && <SubHeader userData={userData} />}
          </Grid>

          <Grid item xs={12} md={6}>
            <Button variant="contained" onClick={() => setModal(true)}>
              Fazer uma transferencia
            </Button>
          </Grid>

          <Grid item xs={12}>
            <TableComponent data={transactions} />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Dashboard
