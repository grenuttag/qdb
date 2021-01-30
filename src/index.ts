import express from "express"
import QuoteController from "./controllers/Quote"

let app = express()
app.use("/quotes", QuoteController)

app.listen(8000, () => console.log("Server is running"))
