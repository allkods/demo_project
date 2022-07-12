import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from "../connection"
import Colleges from './Colleges';

const College_Addresses = sequelize.define('college_addresses',{
    id:{
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    state:{
        type : DataTypes.STRING,
        allowNull: false
    },
    city:{
        type : DataTypes.STRING,
        allowNull : false
    },
    pin:{
        type : DataTypes.CHAR(6),
        allowNull : false
    },
    landmark:{
        type : DataTypes.STRING,
        allowNull : false
    },
    cid:{
        type: DataTypes.INTEGER.UNSIGNED,
        references: {model:'colleges',key:'id'}
    }
},
{
timestamps:true,
paranoid:true,
});

Colleges.hasOne(College_Addresses,{foreignKey:'cid'});

export default College_Addresses