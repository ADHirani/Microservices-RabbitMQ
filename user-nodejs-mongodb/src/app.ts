import express from "express";
import connectDB from "./db";
import userRoutes from "./routes/userRoutes";
import morgan from "morgan";
import { listenToRabbitMQ } from "./services/rabbitmqListener";
import { connectRabbitMQ } from "./services/rabbitmq";

const startServer = async () => {
  await connectRabbitMQ();
  listenToRabbitMQ();
  const app = express();
  const PORT = 5000;

  // Middleware
  app.use(express.json());

  app.use(morgan("dev"));
  // Connect to MongoDB
  connectDB();

  // Routes
  app.use("/api", userRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer()
