import { DataTypes } from 'sequelize'
import sequelize from "../connection"
import Users from './Users';

const U_Details = sequelize.define('u_details',{
    id:{
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    name:{
        type : DataTypes.STRING,
        allowNull : true
    },
    college:{
        type : DataTypes.STRING,
        allowNull : true
    },
    city:{
        type : DataTypes.STRING,
        allowNull:true
    },
    phone:{
        type : DataTypes.CHAR(10),
        allowNull : true

    },
    stream:{
        type : DataTypes.STRING,
        allowNull : true
    },
    qualification:{
        type : DataTypes.STRING,
        allowNull : true
    },
    participation:{
        type : DataTypes.STRING,
        allowNull : true
    },
    userId:{
        type: DataTypes.INTEGER.UNSIGNED,
        references: {model:'users',key:'id'}
    }
},{
    timestamps: true,
    paranoid:true
});

Users.hasOne(U_Details,{foreignKey:'userId'});


export default U_Details