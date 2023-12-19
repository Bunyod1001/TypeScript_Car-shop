import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/sequelize";

export default class Car extends Model {}

Car.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    brand: { type: DataTypes.STRING, allowNull: false },
    hasTanirovka: { type: DataTypes.BOOLEAN, allowNull: false,defaultValue:false },
    engine: { type: DataTypes.STRING, allowNull: false },
    color: { type: DataTypes.STRING, allowNull: false },
    year: { type: DataTypes.STRING, allowNull: false },
    distance: { type: DataTypes.STRING, allowNull: false },
    gearbox: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.STRING, allowNull: false },
    model_id:{type:DataTypes.INTEGER,allowNull:false}
  },
  {
    modelName: "Car",
    sequelize,
    timestamps: false,
  }
);
