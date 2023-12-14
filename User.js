const {DataTypes} = require('sequelize');
const sequelize = require('./db.js');

const User = sequelize.define("users",{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  username:{
    type: DataTypes.STRING
  },
  password:{
    type: DataTypes.STRING
  }
})


module.exports=User;