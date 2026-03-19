import { Schema } from "mongoose";
import { model } from "mongoose";

const certificateSchema = new Schema({
    certificateid: { type: Number, unique: true },
    selectcourse: String,
    candidatename: String,
    selectgrade: String,
    issuedate: String
});

const Certificate = model("Certificate", certificateSchema);

export default Certificate;
