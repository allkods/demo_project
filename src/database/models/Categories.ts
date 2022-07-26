import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from "../connection"

const Vehicle_Categories = sequelize.define('vehicle_categories',{
    id:{
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    categories:{
        type : DataTypes.STRING,
        allowNull: false
    }
});

export default Vehicle_Categories