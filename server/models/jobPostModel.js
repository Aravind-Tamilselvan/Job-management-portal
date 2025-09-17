import mongoose from "mongoose";

const jobPostSchema = mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        enum: ['Internship', 'Full Time', 'Part Time', 'Contract'],
        required: true
    },
    salaryRange: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    applicationDeadline: {
        type: Date,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Job = mongoose.model('job', jobPostSchema)

export default Job