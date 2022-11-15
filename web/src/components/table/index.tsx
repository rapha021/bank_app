import {
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Chip,
} from "@mui/material"
import { ITransaction } from "../../interfaces/transaction.interface"

interface ITableProps {
  data: ITransaction[]
}

const TableComponent = ({ data }: ITableProps) => {
  return (
    <div
      style={{
        width: "90%",
        maxWidth: 820,
        maxHeight: 400,
        overflow: "scroll",
      }}
    >
      <TableContainer component="table" sx={{ maxWidth: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Hora</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Enviado/Recebido</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length < 1 && (
            <TableRow>
              <TableCell>Nenhuma transação encotrada</TableCell>
              <TableCell>Nenhuma transação encotrada</TableCell>
              <TableCell>Nenhuma transação encotrada</TableCell>
              <TableCell>Nenhuma transação encotrada</TableCell>
              <TableCell>Nenhuma transação encotrada</TableCell>
            </TableRow>
          )}
          {data.map((transaction, index) => {
            const getDate = new Date(transaction.createdAt)
            const transactionDate = `${getDate.getDate()}/${getDate.getMonth()}/${getDate.getFullYear()}`
            const transactionHour = `${getDate.getHours()}:${getDate.getMinutes()}`

            return (
              <TableRow key={index}>
                <TableCell>{transactionDate}</TableCell>
                <TableCell>{transactionHour}</TableCell>
                <TableCell>
                  R${transaction.value.toFixed(2).replace(".", ",")}
                </TableCell>
                <TableCell>
                  {transaction.type === "cashOut" ? (
                    <Chip
                      label="Transferencia enviada"
                      size="small"
                      color="error"
                    />
                  ) : (
                    <Chip
                      label="Transferencia recebida"
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
  )
}

export default TableComponent
