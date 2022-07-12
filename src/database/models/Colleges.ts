import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from "../connection"
import College_Users from './College_Users';

const Colleges = sequelize.define('colleges',{
    id:{
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    uniqid:{
        type : DataTypes.STRING,
        allowNull: true
    },
    name:{
        type : DataTypes.STRING,
        allowNull : false
    },
    image:{
        type : DataTypes.STRING,
        allowNull : true
    },
    uid:{
        type: DataTypes.INTEGER.UNSIGNED,
        references: {model:'college_users',key:'id'}
    }
},
{
timestamps:true,
paranoid:true,
});

College_Users.hasOne(Colleges,{foreignKey:'uid'});

export default Colleges