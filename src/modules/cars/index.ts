import { readFileSync } from "fs";
import { resolve } from "path";
import { carResolver } from "./cars.resolvers";
const typeDefs =  readFileSync(resolve("src","modules","cars","cars.schema.gql"),"utf-8")

export default{
    typeDefs,
    carResolver
}