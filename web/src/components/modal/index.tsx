import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material"
import { useRequests } from "../../contexts/requests/requests.context"

interface IModalProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal = ({ setModal }: IModalProps) => {
  const { register, handleSubmit, onSubmit, errors } = useRequests()

  return (
    <Dialog open={true}>
      <DialogTitle>Menu de transferencias</DialogTitle>

      <DialogContent
        sx={{
          width: "300px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <DialogContentText>Fazer transferencia</DialogContentText>

        <TextField
          label="Username"
          variant="outlined"
          placeholder="Insira o username"
          error={errors.username ? true : false}
          helperText={errors.username?.message}
          {...register("username")}
        />

        <TextField
          label="Valor"
          variant="outlined"
          placeholder="Insira o valor"
          type="number"
          error={errors.value ? true : false}
          helperText={errors.value?.message}
          {...register("value")}
        />
      </DialogContent>

      <DialogActions>
        <Button variant="text" onClick={handleSubmit(onSubmit)}>
          Enviar
        </Button>
        <Button variant="text" onClick={() => setModal(false)}>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Modal
