import mongoose from "mongoose"

const jobschema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        require: true
    },
    company: {
        type: String,
        trim: true,
        require: true
    },
    expectedsalary: {
        type: String,
        trim: true,
        require: true
    },
    type: {
        type: String,
        trim: true,
        require: true
    },
    location: {
        type: String,
        trim: true,
        require: true,
    },
    applicationurl: {
        type: String,
        trim: true,
        require: true,
        unique: true
    },
    postedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin"
    }
}, {timestamps: true});

export default mongoose.model('job', jobschema);