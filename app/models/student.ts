//   /app/models/student.ts
import mongoose from 'mongoose';
import autoIncrement from "mongoose-auto-increment";

const Schema = mongoose.Schema;

// create a schema
const StudentSchema = new Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    School: {
        type: String,
        required: true
    },
    StartDate: {
        type: Date,
        required: true
    }
});
autoIncrement.initialize(mongoose.connection);
StudentSchema.plugin(autoIncrement.plugin, { model: "student", startAt: 1 });
export default mongoose.model("student", StudentSchema);
