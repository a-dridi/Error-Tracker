import mongoose from "mongoose";

const Schema = mongoose.Schema;

let ErrorMessage = new Schema ({
    date: {
        type: Date,
        default: Date.now
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
    status: {
        type: String,
        default: "Open"
    },
    fixed: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model("ErrorMessage", ErrorMessage);