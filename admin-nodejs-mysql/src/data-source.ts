import { DataSource } from "typeorm";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root", // replace with your MySQL username
    password: "root", // replace with your MySQL password
    database: "microservices", // replace with your MySQL database name
    synchronize: true, // auto sync entities to DB
    // logging: true,
    entities: [User],
});
