// rabbitmq.ts
import amqp from "amqplib";

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect("amqps://lzunrems:RnP5KRiiYiPfAeGMpO2PQX2S3uyzMvBG@shrimp.rmq.cloudamqp.com/lzunrems"); // replace with your RabbitMQ URL
    channel = await connection.createChannel();
    console.log("Connected to RabbitMQ!");
  } catch (error) {
    console.error("Failed to connect to RabbitMQ:", error);
  }
};

export const getRabbitMQChannel = () => {
  return channel;
};
