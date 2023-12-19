import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
    database:"mybase",
    dialect:"postgres",
    username:"postgres",
    password:"postgres9009",
    models:[],
    logging:false,
})
export default sequelize