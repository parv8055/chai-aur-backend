import express from "express";
import cookioParser from "cookie-parser";
import cors from "cors";
import morgan from 'morgan'
//import routes 
import userRouter from './routes/user.route.js'

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
if(process.env.NODE_ENVIRONMENT==='dev'){
  app.use(morgan('dev'))
}
app.use(cookioParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));


//routes declarisation
app.use('/api/v1/users',userRouter)

export default app;
