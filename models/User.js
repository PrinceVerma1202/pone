const mongoose = require('mongoose')

// field 

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        Require:true
    },
    email:{ 
        type:String,
        Require:true
    },
    password:{
        type:String,
        Require:true
    },
    role:{
        type:String,
        default:'user'
    },
    image: {
        public_id:{
            type: String,
            Require:true,
        },
        url:{
            type: String,
            Require:true,
        }
    }
},{timestamps:true})

// modell 
const UserModel = mongoose.model('users',UserSchema)

module.exports = UserModel;