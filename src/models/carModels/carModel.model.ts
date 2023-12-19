import sequelize from "../../config/sequelize";
import { DataTypes, Model } from "sequelize";

interface carProps {
  id?: number;
  name: string;
}
export default class carModels extends Model<carProps> {}

carModels.init(
  {
    name: DataTypes.STRING,
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  { modelName: "CarModels", sequelize ,timestamps:false,}
);
