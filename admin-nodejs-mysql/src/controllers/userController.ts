import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { getRabbitMQChannel } from "../services/rabbitmq";

export const getUsers = async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, gender } = req.body;
  const userRepository = AppDataSource.getRepository(User);
  const user = userRepository.create({ name, email, gender });
  await userRepository.save(user);

  // Publish event to RabbitMQ
  const channel = getRabbitMQChannel();
  const newUser = { id: user.id, name: user.name, email: user.email };
  channel.sendToQueue("user_created", Buffer.from(JSON.stringify(newUser)));
  // End of RabbitMQ code
  res.json(user);
};

export const getUser = async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: Number(req.params.id) });
  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { name, email, gender } = req.body;
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: Number(req.params.id) });
  if (user) {
    user.name = name;
    user.email = email;
    user.gender = gender;
    await userRepository.save(user);
    // Publish event to RabbitMQ
    const channel = getRabbitMQChannel();
    const updatedUser = { id: user.id, name: user.name, email: user.email };
    channel.sendToQueue(
      "user_updated",
      Buffer.from(JSON.stringify(updatedUser))
    );
    // End of RabbitMQ code
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);
  await userRepository.delete(req.params.id);
  res.json({ message: "User deleted" });
};
