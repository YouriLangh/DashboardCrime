import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import statRoutes from "./routes/general-stats.js"

/* Configurations */
dotenv.config()
const app = express();
app.use(express.json());
app.use(cors())

/* ROUTES */
app.use("/stats", statRoutes)

app.listen(5000, () => {console.log("server started on port 5000")});
