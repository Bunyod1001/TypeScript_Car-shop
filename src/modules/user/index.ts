import { readFileSync } from "fs";
import { resolve } from "path";
import { userResolver } from "./user.resolvers";

const typeDefs =  readFileSync(resolve("src","modules","user","user.schema.gql"),"utf-8")

export default{
    typeDefs,
    userResolver
}