// rabbitmqListener.ts (MongoDB service)
import { getRabbitMQChannel } from "./rabbitmq";
import User from "../models/User"; // Mongoose user model

export const listenToRabbitMQ = async () => {
  const channel = getRabbitMQChannel();
  if (channel) {
    // Ensure that the queue exists before consuming
    await channel.assertQueue("user_created", { durable: true });
    await channel.assertQueue("user_updated", { durable: true });

    // Listen for User Created event
    channel.consume("user_created", async (message: any) => {
      const user = JSON.parse(message.content.toString());
      // Create user in MongoDB
      await User.create(user);
      console.log("User created in MongoDB:", user);
      channel.ack(message);
    });

    // Listen for User Updated event
    channel.consume("user_updated", async (message: any) => {
      const user = JSON.parse(message.content.toString());
      // Update user in MongoDB
      await User.findByIdAndUpdate(user.id, user);
      console.log("User updated in MongoDB:", user);
      channel.ack(message);
    });
  } else {
    console.error("RabbitMQ channel is not initialized.");
  }
};
