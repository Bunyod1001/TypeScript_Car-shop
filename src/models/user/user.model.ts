import bcrypt from "bcrypt";
import sequelize from "../../config/sequelize";
import { DataTypes, Model } from "sequelize";
import IUser from "../../interfaces/user.interface";


export default class UserModel extends Model<IUser> {
  public id!: number;
  public username!: string;
  public password!: string;
  public token: string
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token:{
        type:DataTypes.TEXT,
    }
  },
  { modelName: "users", sequelize,timestamps:false }
);

UserModel.addHook("beforeCreate", async (user: UserModel) => {
  user.password = await bcrypt.hash(user.password, 10);
});
