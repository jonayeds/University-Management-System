
export interface IUser{
    id:string;
    password:string;
    needsPasswordChange:boolean;
    role:"admin"| "student" | "faculty";
    isDeleted:boolean;
    status:"inProgress"| "blocked"
}

export interface NewUser {
    role:string;
    password?:string;
    id:string
}