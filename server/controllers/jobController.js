import Job from "../models/jobPostModel.js"

export const createJob = async(req,res)=>{
    try {
        const {jobTitle,companyName,location,jobType,salaryRange,applicationDeadline,jobDescription} = req.body // Receiving data points from client

        // checking any missing fields
        if(!jobTitle || !companyName || !location || !jobType || !salaryRange || !applicationDeadline || !jobDescription){
            return res.status(400).json({message:"Please fill out all the fields"})
        }

        // creating job with model
        const job = await Job.create({
            jobTitle,
            companyName,
            location,
            jobType,
            salaryRange,
            applicationDeadline,
            jobDescription
        })

       res.status(200).json({job,message:"Job Posted successfully"})

    } catch (error) {
        console.log(`Error in createJob controller: ${error}`)
        return res.status(500).json({message :'Internal Server error'})
    }
}

export const getJobs = async(req,res)=>{
    try {
        const jobs = await Job.find({}) //getting all job posts from the model
        res.status(200).json({jobs,message:"Jobs sent successfully"})
    } catch (error) {
        console.log(`Error in getJobs controller: ${error}`)
        return res.status(500).json({message :'Internal Server error'})
    }
}