import app from "./app"
import { AppDataSource } from "./data-source"
;(async () => {
  await AppDataSource.initialize()

  app.listen(3000 || process.env.PORT, () => {
    console.log(`server running on port ${3000 || process.env.PORT}`)
  })
})()
