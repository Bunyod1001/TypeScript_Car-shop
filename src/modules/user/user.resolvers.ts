import { GraphQLError } from "graphql";
import IUser from "../../interfaces/user.interface";
import UserModel from "../../models/user/user.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IToken } from "../../interfaces/token.interface";

export const userResolver = {
  Query: {
    users: async () => {
      const users = await UserModel.findAll();
      return users;
    },
  },
  Mutation: {
    signup: async (_: unknown, { username, password }: IUser) => {
      try {
        const existUsername = await UserModel.findOne({ where: { username } });

        if (existUsername) {
          throw new GraphQLError(
            "this username already taken please choose another one!"
          );
        }

        const newUser = await UserModel.create({
          username,
          password,
        });
        const token = jwt.sign({ newUser }, "just");

        newUser.token = token;
        newUser.save();
        return { status: true, data: newUser, token };
      } catch (error: any) {
        console.log(error.message);
        return new GraphQLError(error.message);
      }
    },
    updateUser: async (_: unknown, { username, id }: IUser) => {
      try {
        const existUsername = await UserModel.findOne({ where: { username } });

        if (existUsername) {
          throw new GraphQLError(
            "this username already taken please choose another one!"
          );
        }

        const updatedUser = await UserModel.update(
          {
            username,
          },
          { where: { id } }
        );
        const token = jwt.sign({ updatedUser }, "just");

        return { status: true, data: updatedUser, token };
      } catch (error: any) {
        console.log(error.message);
        return new GraphQLError(error.message);
      }
    },
    deleteUser: async (
      _: unknown,
      { username }: IUser,
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
          return new GraphQLError("you don't have access to delete user", {
            extensions: {
              status: 401,
              code: "BAD REQUEST",
            },
          });
        }
        const deletedUser = await UserModel.destroy({
          where: { username },
        });
        return { status: true, data: deletedUser };
      } catch (error: any) {
        console.log(error.message);
        return new GraphQLError(error.message);
      }
    },
  },
};
