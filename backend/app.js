import express from "express"
import cors from "cors"
import dotenv from "dotenv";

dotenv.config({
    path: './.env'
});

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

//routes import
import { router as todosRouter } from './src/routes/todos.route.js'
import { router as todoRouter } from './src/routes/todo.route.js'

//routes declaration
app.use("/api/v1", todosRouter)
app.use("/api/v2", todoRouter)

// http://localhost:8000/api/v1/todos
// http://localhost:8000/api/v2/todo

export { app }