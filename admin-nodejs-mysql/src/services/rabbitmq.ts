// rabbitmq.ts
import amqp from "amqplib";

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect({
      hostname: 'shrimp-01.rmq.cloudamqp.com', // Replace with actual SQL RabbitMQ instance hostname
      port: 5672, // Default RabbitMQ port
      username: 'ezmvpbmv', // Replace with your username
      password: '8s-At8jdysi4J4oDbtET92SWAjKM56dv', // Replace with your password
      vhost: 'ezmvpbmv' // Optional, if using a specific virtual host
    }); // replace with your RabbitMQ URL
    channel = await connection.createChannel();
    console.log("Connected to RabbitMQ!");
  } catch (error) {
    console.error("Failed to connect to RabbitMQ:", error);
  }
};

export const getRabbitMQChannel = () => {
  return channel;
};
