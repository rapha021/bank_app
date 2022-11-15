import { DataSource } from "typeorm"
import "dotenv/config"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,

  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PWD,
  database: process.env.POSTGRES_DB,

  synchronize: false,
  logging: true,

  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
})
