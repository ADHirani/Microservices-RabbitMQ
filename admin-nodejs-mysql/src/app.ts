import express from "express";
import "reflect-metadata";
import morgan from "morgan";
import router from "./routes/userRoutes";
import { AppDataSource } from "./data-source";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

app.use(morgan("dev"));

// Routes
app.use("/api", router);

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: Error) => console.log(error));
