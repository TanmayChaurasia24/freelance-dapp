import {Request, Response} from "express"
import job from "../model/job.model"
import jobModel from "../model/job.model";

export const jobpost = async (req: Request, res: Response): Promise<any> => {
    const {title,description,company,salary,type,location,applicationurl} = req.body;
    console.log(title,description,company,salary,type,location,applicationurl);
    

    try {
        if(!title || !description || !company || !salary || !type || !location || !applicationurl) {
            return res.status(400).json({
                message: "incomplete information"
            })
        }

        const ispresent = await job.findOne({applicationurl});
        if(ispresent) {
            return res.status(300).json({
                message: "job posting with same url is already there, try different url"
            })
        }

        console.log("creating job!");
        
        const newjob = await job.create({
            title,
            description,
            company,
            salary,
            type,
            location,
            applicationurl
        });

        console.log("job created!");
        
        return res.status(201).json({
            newjob
        })
    } catch (error: any) {
        return res.status(500).json({
            message: "error while posting jobs from admin",
            err: error.message
        })
    }
}

export const showjobs = async(req: Request, res: Response): Promise<any> => {
    try {
        const response = await job.find();
        return res.status(201).json({
            response
        })
    } catch (error) {
        return res.status(500).json({
            message: "error while fetching all the jobs"
        })
    }
}

export const deletejob = async(req: Request, res: Response): Promise<any> => {
    const jobid = req.headers._id;

    try {
        const response = await jobModel.findByIdAndDelete(jobid);
        
        if(!response) {
            return res.status(404).json({
                message: "job not found"

            })
        }

        return res.status(201).json({
            message: "user deleted success",
            response,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "error while deleting job"
        })
    }
}
