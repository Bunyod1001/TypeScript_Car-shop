export default interface IUser {
    username:string;
    password:string;
    id?:string,
    token?:string;
    isAdmin?:boolean
}