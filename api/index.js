import express from "express"
import morgan from "morgan"
import mongoose from "mongoose";
import path from "path"
import 'dotenv/config'
import userRoute from "./routes/user.route.js"
import authRoute from "./routes/auth.route.js"
import cookieParser from 'cookie-parser';

const __dirname = path.resolve();

const app = express()
const port = 3000

app.use(morgan("dev"))
app.use(cookieParser());
app.use(express.json());

async function main() {
  try {
    await mongoose.connect(process.env.MDB_CONNECT_STRING);
  } catch (error) {
    console.log(error);
  }
}
main();

app.use(express.static(path.join(__dirname, 'client/dist')))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client","dist","index.html"))
});

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500
  const message = err.message || "Something went wrong"
  return res.status(statusCode).json({
    success:false,
    message,
    statusCode,
  })
}) 

