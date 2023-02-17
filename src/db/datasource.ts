import Entities from './entities'
import Migrations from './migrations'
import { DataSource } from 'typeorm'
import { config } from 'dotenv'

config()
const dataSource = new DataSource({
   type: 'mysql',
   host: process.env.DB_HOST_DEF,
   port: Number(process.env.DB_PORT),
   username: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_DB,
   entities: Entities,
   migrations: Migrations,
   charset: process.env.DB_CHARSET,
   timezone: process.env.DB_TIMEZONE,
})

// dataSource.initialize()
//    .then(() => {
//       console.log("Data source has been initialized!");
//    })
//    .catch((err) => {
//       console.error("Error during Data source initialization", err);
//    })

export default dataSource