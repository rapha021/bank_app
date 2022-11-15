import {
  Paper,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material"

export interface ITransaction {
  id: string
  value: number
  createdAt: string
  account: {
    username: string
  }
  type: "cashOut" | "cashIn"
}

interface ITableProps {
  data: ITransaction[]
}

const Table = ({ data }: ITableProps) => {
  return (
    <TableContainer component="table">
      <TableHead>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell>Valor</TableCell>
          <TableCell>Tipo</TableCell>
          <TableCell>Enviado/Recebido de</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((transaction, index) => (
          <TableRow key={index}>
            <TableCell>{transaction.id}</TableCell>
            <TableCell>
              R${transaction.value.toFixed(2).replace(".", ",")}
            </TableCell>
            <TableCell>
              {transaction.type === "cashOut" ? "Enviado" : "Recebido"}
            </TableCell>
            <TableCell>{transaction.account.username}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  )
}

export default Table
