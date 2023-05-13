import { DataSource, DataSourceOptions } from 'typeorm'
import * as dotenv from 'dotenv'

dotenv.config()

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [`${__dirname}/entities/*.entity.js`],
  migrations: [`${__dirname}/migrations/*.js`],
  logging: true,
}

const datasource = new DataSource(dataSourceOptions)

export default datasource
