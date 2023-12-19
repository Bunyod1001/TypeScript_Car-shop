import user from "./user"
import carModels from "./carModels"
import cars from "./cars"
import fileUpload from "./fileUpload"
import {makeExecutableSchema} from "@graphql-tools/schema"


export default makeExecutableSchema({
    resolvers:[user.userResolver,carModels.carModelsResolver,cars.carResolver,fileUpload.fileUpload],
    typeDefs:[user.typeDefs,carModels.typeDefs,cars.typeDefs,fileUpload.typeDefs]
})