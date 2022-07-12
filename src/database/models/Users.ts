
import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from "../connection"
import Exams from './Exams';

const Users = sequelize.define('users',{
    id:{
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    email:{
        type : DataTypes.STRING,
        allowNull : false
    },
    password:{
        type : DataTypes.STRING,
        allowNull : false
    },
    examId:{
        type: DataTypes.INTEGER.UNSIGNED,
        references: {model:'exams',key:'id'}
    },
    type:{
        type:DataTypes.CHAR(1),
        allowNull: false
    }
},
{
timestamps:true,
paranoid:true,
});

Exams.hasOne(Users,{foreignKey:'examId'});

export default Users