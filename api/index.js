import express from "express"
import morgan from "morgan"
import path from "path"

const __dirname = path.resolve();

const app = express()
const port = 3000

app.use(morgan("dev"))


app.use(express.static(path.join(__dirname, 'client/dist')))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client","dist","index.html"))
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})