import mongoose from "mongoose";

const usermodel = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        $regex: "\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*"
    },
    password: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true,
    },
    bio: {
        type: String,
        trim: true
    },
    skills: {
        type: [String],
        default: [],
    },
    profilepic: {
        type: String,
        default: ' ',
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
    appliedJobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job'
        }
    ],    
},{timestamps: true})

export default mongoose.model('User', usermodel)