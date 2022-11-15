import app from "./app"
import { AppDataSource } from "./data-source"
;(async () => {
  await AppDataSource.initialize()

  app.listen(3000, () => {
    console.log("server running")
  })
})()
