import Car from "./car/car.model";
import carModels from "./carModels/carModel.model";

export function setUpRelations() {
  carModels.hasMany(Car, {
    foreignKey: "model_id",
    as:"cars"
  });
  Car.belongsTo(carModels, {
    foreignKey: "model_id",
   
  });
}

