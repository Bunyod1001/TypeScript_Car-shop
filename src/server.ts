import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import sequelize from "./config/sequelize";
import schema from "./modules";
import UserModel from "./models/user/user.model";
import jwt from "jsonwebtoken";
import { setUpRelations } from "./models";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import cors from "cors";
import { graphqlUploadExpress } from "graphql-upload-ts";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { IToken } from "./interfaces/token.interface";

const app = express();
const httpServer = http.createServer(app);

async function bootstrapt() {
  try {
    await sequelize.authenticate();

    // sequelize.addModels([UserModel])
    setUpRelations();
    sequelize
      .sync({ alter: true })
      .then(() => console.log("db synchronized"))
      .catch((error) => console.log(error.message));

    UserModel.sequelize;
    const adminUser = await UserModel.findOne({ where: { username: "admin" } });

    if (!adminUser) {
      const admin = await UserModel.create({
        username: "admin",
        password: "admin",
      });
      const token = jwt.sign({ isAdmin:true }, "just");
      admin.token = token;
      await admin.save();
      console.log("Admin user created");
    }

    const server = new ApolloServer({
      schema,
      csrfPrevention: false,
      plugins:[ApolloServerPluginDrainHttpServer({ httpServer })]
    });

    // shotta muammo bovotti 

    // await server.start();
    // // server.addPlugin(ApolloServerPluginDrainHttpServer({ httpServer }));
    // app.use(
    //   "/graphql",
    //   graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }),
    //   express.json(),
    //   cors<cors.CorsRequest>,
    //   expressMiddleware(server)
    // );

    
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4001 },
      context: async ({ req, res }): Promise<IToken> => {
        const access_token: string = req.headers.authorization || "";
        return { access_token };
      },
    });
    console.log(`🚀  Server ready at: ${url}`);
  } catch (error: any) {
    console.log(error.message);
  }
}

bootstrapt();
