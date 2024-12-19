import { model,Schema } from "mongoose";


export interface IUser {
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    isAdmin:boolean;
    address:string;
    token:string;
}

export const UserSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:true
    },
    address:{
        type:String,
        required:true
    },
},
    {
        toObject:{
            virtuals:true
        },
        toJSON:{
            virtuals:true
        },
        timestamps:true
    }
)


export const UserModel = model<IUser>("users",UserSchema)