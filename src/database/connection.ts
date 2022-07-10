// import Sequelize from 'sequelize';
import config from '../config/config';


// const sequelize = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {host:config.mysql.host, dialect: "mysql", operatorsAliases:false}) 

import { Dialect, Sequelize } from 'sequelize'

const dbName = config.mysql.database as string
const dbUser = config.mysql.user as string
const dbHost = config.mysql.host
const dbDriver = config.mysql.dialect as Dialect
const dbPassword = config.mysql.password



const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
  logging:false
})

export default sequelizeConnection