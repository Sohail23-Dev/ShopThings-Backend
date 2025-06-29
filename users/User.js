import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone : {
        type : Number
    },
    address: {
        type: String,
    },
    joined: {
        type: Date
    },
    membership: {
        type : Boolean,
        default : false
    },
    orders : {
        type : Array
    },
    avatar: {
        type: String, // base64 or URL
    }
})

const User = mongoose.model("ShopThings-Users", userSchema);

export default User;