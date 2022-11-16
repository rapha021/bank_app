import { ArrowDropDown } from "@mui/icons-material"
import {
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Chip,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  ButtonGroup,
} from "@mui/material"
import { useEffect, useState } from "react"
import { ITransaction } from "../../interfaces/transaction.interface"

interface ITableProps {
  data: ITransaction[]
}

const TableComponent = ({ data }: ITableProps) => {
  const [transactions, setTransactions] = useState<ITransaction[]>(data)
  const [filterType, setFilterType] = useState("all")

  const cashInTransactions = data.filter(
    (transaction) => transaction.type === "cashIn"
  )

  const cashOutTransactions = data.filter(
    (transaction) => transaction.type === "cashOut"
  )

  useEffect(() => {
    setTransactions(data)
    setFilterType("all")
  }, [data])

  return (
    <div style={{ width: "90%", marginTop: "60px" }}>
      <ButtonGroup
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          "@media(max-width: 700px)": {
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Button
          color={filterType === "all" ? "info" : "primary"}
          variant={filterType === "all" ? "outlined" : "contained"}
          onClick={() => {
            setTransactions(data)
            setFilterType("all")
          }}
        >
          Todos
        </Button>

        <Button
          color={filterType === "cashIn" ? "success" : "primary"}
          onClick={() => {
            setTransactions(cashInTransactions)
            setFilterType("cashIn")
          }}
        >
          Recebidas
        </Button>

        <Button
          color={filterType === "cashOut" ? "error" : "primary"}
          onClick={() => {
            setTransactions(cashOutTransactions)
            setFilterType("cashOut")
          }}
        >
          Transferidos
        </Button>
      </ButtonGroup>
      <div
        style={{
          width: "100%",
          maxWidth: 820,
          maxHeight: 400,
          overflow: "auto",
          marginTop: "30px",
        }}
      >
        <TableContainer component="table" sx={{ maxWidth: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>Hora</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell
                sx={{ "@media(max-width: 700px)": { display: "none" } }}
              >
                Tipo
              </TableCell>
              <TableCell>Enviado/Recebido</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.length < 1 && (
              <>
                <TableCell>Sem transferencia</TableCell>
                <TableCell>Sem transferencia</TableCell>
                <TableCell>Sem transferencia</TableCell>
                <TableCell
                  sx={{ "@media(max-width: 700px)": { display: "none" } }}
                >
                  Sem transferencia
                </TableCell>
                <TableCell>Sem transferencia</TableCell>
              </>
            )}
            {transactions.map((transaction, index) => {
              const getDate = new Date(transaction.createdAt)
              const transactionDate = `${getDate.getDate()}/${getDate.getMonth()}/${getDate.getFullYear()}`
              const transactionHour = `${getDate.getHours()}:${getDate.getMinutes()}`

              return (
                <TableRow key={index}>
                  <TableCell>{transactionDate} </TableCell>
                  <TableCell>{transactionHour}</TableCell>
                  <TableCell>
                    R${transaction.value.toFixed(2).replace(".", ",")}
                  </TableCell>
                  <TableCell
                    sx={{ "@media(max-width: 700px)": { display: "none" } }}
                  >
                    {transaction.type === "cashOut" ? (
                      <Chip
                        label="Transferência enviada"
                        size="small"
                        color="error"
                      />
                    ) : (
                      <Chip
                        label="Transferência recebida"
                        size="small"
                        color="success"
                      />
                    )}
                  </TableCell>
                  <TableCell>{transaction.account.username}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </TableContainer>
      </div>
    </div>
  )
}

export default TableComponent
