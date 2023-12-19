import { GraphQLError } from "graphql";
import carModels from "../../models/carModels/carModel.model";
import Car from "../../models/car/car.model";
import { IToken } from "../../interfaces/token.interface";
import jwt, { JwtPayload } from "jsonwebtoken";

interface ICarModels {
  name: string;
  id?: number;
}
export const carModelsResolver = {
  Query: {
    models: async () => {
      try {
        const model = await carModels.findAll({
          include: { model: Car, as: "cars" },
        });

        return model;
      } catch (error: any) {
        return new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    createCarModel: async (
      _: unknown,
      { name }: ICarModels,
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
          return new GraphQLError("you don't have access to create car model", {
            extensions: {
              status: 401,
              code: "BAD REQUEST",
            },
          });
        }

        const existModel = await carModels.findOne({ where: { name } });
        if (existModel) {
          throw new GraphQLError("this model already created");
        }
        const newModel = await carModels.create({ name });

        return { status: true, data: newModel };
      } catch (error: any) {
        return new GraphQLError(error.message);
      }
    },
    updateCarModel: async (
      _: unknown,
      { name, id }: ICarModels,
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
          return new GraphQLError("you don't have access to update car model", {
            extensions: {
              status: 401,
              code: "BAD REQUEST",
            },
          });
        }

        const existModel = await carModels.findOne({ where: { name } });
        if (existModel) {
          throw new GraphQLError("this model already created");
        }
        const updatedCarModel = carModels.update({ name }, { where: { id } });

        return { status: true, data: updatedCarModel };
      } catch (error: any) {
        return new GraphQLError(error.message);
      }
    },
    deleteCarModel: async (
      _: unknown,
      { name }: ICarModels,
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
          return new GraphQLError("you don't have access to delete car model", {
            extensions: {
              status: 401,
              code: "BAD REQUEST",
            },
          });
        }
        const deletedCarModel = carModels.destroy({ where: { name } });

        return { status: true, data: deletedCarModel };
      } catch (error: any) {
        return new GraphQLError(error.message);
      }
    },
  },
};
