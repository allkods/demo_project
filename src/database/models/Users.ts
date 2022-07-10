
import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../connection'

interface UsersAttributes {
  id: number;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface UsersInput extends Optional<UsersAttributes, 'id' > {}
export interface UsersOutput extends Required<UsersAttributes> {}


class Users extends Model<UsersAttributes, UsersInput> implements UsersAttributes {
    public id!: number
    public email!: string
    public password!: string
  
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

  }

  Users.init(
    {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
  }
)


export default Users