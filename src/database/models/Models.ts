import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from "../connection"
import Vehicle_Companies from './Companies';

const Vehicle_Models = sequelize.define('vehicle_models',{
    id:{
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    models:{
        type : DataTypes.STRING,
        allowNull: false
    },
    com_id:{
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            model:'vehicle_companies',
            key:'id'
        }
    }
});

Vehicle_Companies.hasMany(Vehicle_Models,{foreignKey:'com_id', as:'models' });

export default Vehicle_Models