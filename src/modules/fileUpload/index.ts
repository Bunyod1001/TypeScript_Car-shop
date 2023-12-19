import { readFileSync } from "fs";
import { resolve } from "path";
import { fileUpload } from "./fileUpload.resolvers";
const typeDefs =  readFileSync(resolve("src","modules","fileUpload","fileUpload.schema.gql"),"utf-8")

export default{
    typeDefs,
    fileUpload
}