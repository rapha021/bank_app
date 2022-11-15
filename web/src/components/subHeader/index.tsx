interface IubHeaderProps {
  name: string
  balance: number
}

const SubHeader = ({ name, balance }: IubHeaderProps) => {
  return (
    <div>
      <h1>Olá, {name}</h1>
      <h2>Seu saldo: R${balance.toFixed(2).replace(".", ",")}</h2>
    </div>
  )
}

export default SubHeader
