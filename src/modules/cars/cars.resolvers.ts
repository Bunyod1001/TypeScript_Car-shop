import { GraphQLError } from "graphql";
import ICar from "../../interfaces/car.interface";
import Car from "../../models/car/car.model";
import { IToken } from "../../interfaces/token.interface";
import jwt, {JwtPayload } from "jsonwebtoken";

export const carResolver = {
  Query: {
    cars: async () => {
      const cars = await Car.findAll();
      return cars;
    },
    onOneType: async (_: unknown, { model_id }: ICar) => {
      const car = await Car.findAll({ where: { model_id } });
      return car;
    },
  },
  Mutation: {
    createCar: async (
      _: unknown,
      {
        name,
        brand,
        hasTanirovka,
        engine,
        color,
        distance,
        gearbox,
        description,
        model_id,
        year,
        price,
      }: ICar,
      { access_token }: IToken
    ) => {
      try {
        if (!access_token) {
          return new GraphQLError("invalid token", {
            extensions: {
              status: 401,
              code: "UNAUTHORIZED",
            },
          });
        }
        const decodedToken = jwt.verify(access_token,"just") as JwtPayload;
        if (!decodedToken) {
          return new GraphQLError("invalid token", {
            extensions: {
              status: 401,
              code: "INVALID_TOKEN",
            },
          });
        }
        console.log(decodedToken.isAdmin);
        
        if (!decodedToken.isAdmin) {
          return new GraphQLError("you don't have access to add new car",{
            extensions:{
              status:401,
              code:"BAD REQUEST"
            }
          });
        }
        const newCar = await Car.create({
          name,
          brand,
          hasTanirovka,
          engine,
          color,
          distance,
          gearbox,
          description,
          model_id,
          year,
          price,
        });
        return { status: true, data: newCar };
      } catch (error: any) {
        return new GraphQLError(error.message);
      }
    },
    updateCar: async (
      _: unknown,
      {
        name,
        brand,
        hasTanirovka,
        engine,
        color,
        distance,
        gearbox,
        description,
        model_id,
        year,
        price,
        id,
      }: ICar,
      { access_token }: IToken
    ) => {
      try {
        if (!access_token) {
          return new GraphQLError("invalid token", {
            extensions: {
              status: 401,
              code: "UNAUTHORIZED",
            },
          });
        }
        const decodedToken = jwt.verify(access_token, "just") as JwtPayload;
        if (!decodedToken) {
          return new GraphQLError("invalid token", {
            extensions: {
              status: 401,
              code: "INVALID_TOKEN",
            },
          });
        }
        if (!decodedToken.isAdmin) {
          return new GraphQLError("you don't have access to update  car",{
            extensions:{
              status:401,
              code:"BAD REQUEST"
            }
          });
        }
        const updatedCar = await Car.update(
          {
            name,
            brand,
            hasTanirovka,
            engine,
            color,
            distance,
            gearbox,
            description,
            model_id,
            year,
            price,
          },
          { where: { id } }
        );
        return { status: true, data: updatedCar };
      } catch (error: any) {
        return new GraphQLError(error.message);
      }
    },
    deleteCar: async (_: unknown, { id }: ICar, { access_token }: IToken) => {
      try {
        if (!access_token) {
          return new GraphQLError("invalid token", {
            extensions: {
              status: 401,
              code: "UNAUTHORIZED",
            },
          });
        }
        const decodedToken = jwt.verify(access_token, "just") as JwtPayload;
        if (!decodedToken) {
          return new GraphQLError("invalid token", {
            extensions: {
              status: 401,
              code: "INVALID_TOKEN",
            },
          });
        }

        if (!decodedToken.isAdmin) {
          return new GraphQLError("you don't have access to delete car",{
            extensions:{
              status:401,
              code:"BAD REQUEST"
            }
          });
        }
        const deletedCar = await Car.destroy({ where: { id } });
        return { status: true, data: deletedCar };
      } catch (error: any) {
        return new GraphQLError(error.message);
      }
    },
  },
};
