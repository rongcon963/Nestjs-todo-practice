import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOption: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "postgres",
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/src/migrations/*.js'],
}

const dataSource = new DataSource(dataSourceOption);
export default dataSource;