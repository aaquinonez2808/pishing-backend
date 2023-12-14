const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME|| "hacking",process.env.DB_USERNAME|| "postgres",process.env.DB_PASSWORD|| "root", {
  host:process.env.DB_HOST||"localhost",
  dialect:"postgres"
})
module.exports= sequelize;