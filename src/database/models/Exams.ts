import { DataTypes } from 'sequelize'
import sequelize from "../connection"
import Colleges from './Colleges';

const Exams = sequelize.define('exams',{
    id:{
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    uniqid:{
        type : DataTypes.STRING,
        allowNull:false
    },
    name:{
        type : DataTypes.STRING,
        allowNull: false
    },
    image:{
        type : DataTypes.STRING,
        allowNull : false
    },
    starting:{
        type : DataTypes.DATE,
        allowNull : false
    },
    duration:{
        type : DataTypes.CHAR(3),
        allowNull : false
    },
    cid:{
        type: DataTypes.INTEGER.UNSIGNED,
        references: {model:'colleges',key:'id'}
    }
},
{
timestamps:true
});

Colleges.hasMany(Exams,{foreignKey:'cid'});

export default Exams