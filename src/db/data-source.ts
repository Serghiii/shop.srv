import Entities from './entities'
import Migrations from './migrations'
import { DataSource } from 'typeorm'

const MysqlDataSource = new DataSource({
   type: 'mysql',
   host: 'localhost',
   port: 3306,
   username: 'root',
   password: 'admin',
   database: 'shop',
   entities: Entities,
   migrations: Migrations,
   charset: 'utf8_general_ci',
   timezone: '+02:00',
   // synchronize: process.env.SYNCHRONIZE === 'true'
})

export default MysqlDataSource