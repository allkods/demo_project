import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from "../connection"
import Vehicle_Categories from './Categories';

const Vehicle_Companies = sequelize.define('vehicle_companies',{
    id:{
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    companies:{
        type : DataTypes.STRING,
        allowNull: false
    },
    cat_id:{
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            model:'vehicle_categories',
            key:'id'
        }
    }
});

Vehicle_Categories.hasMany(Vehicle_Companies,{foreignKey:'cat_id',as:'companies'});

export default Vehicle_Companies