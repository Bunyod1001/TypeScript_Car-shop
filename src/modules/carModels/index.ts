import { readFileSync } from "fs";
import { resolve } from "path";
import { carModelsResolver } from "./carModels.resolvers";
const typeDefs =  readFileSync(resolve("src","modules","carModels","carModels.schema.gql"),"utf-8")

export default{
    typeDefs,
    carModelsResolver
}