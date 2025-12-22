import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv';


dotenv.config();

const dbName = process.env.DB_POSTGRES_DATABASE as string;
const dbHost = process.env.DB_POSTGRES_HOST as string;
const dbUsername = process.env.DB_POSTGRES_USERNAME as string;
const dbPassword = process.env.DB_POSTGRES_PASSWORD as string;
const port = parseInt(process.env.DB_POSTGRES_PORT || "5432", 10); // safely convert to number
const dbDialect: any = "postgres"; // or use Sequelize.Dialect if you want to be strict

const sequelizeConnection = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  port,
  dialect: dbDialect,
  logging: false,
});
;
sequelizeConnection
  .authenticate()
  .then(() => {
    console.log("PostgreSQL DB Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

export default sequelizeConnection;
