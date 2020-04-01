import mongoose from "mongoose";

const Schema = mongoose.Schema;

let FixedError = new Schema ({
    fixedDate: {
        type: Date,
        default: Date.now
    },
    note: {
        type: String
    },
    application: {
        type: String
    },
    title: {
        type: String,
        default: "ERROR"
    },
    description: {
        type: String
    },
    errorDate: {
        type: Date
    },
    fixed: {
        type: Boolean,
        default: true
    }
})

export default mongoose.model("FixedError", FixedError);