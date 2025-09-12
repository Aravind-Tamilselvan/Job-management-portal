import express from "express"
import { createJob, getJobs } from "../controllers/jobController.js"
import { isAdminRoute, protectRoute } from "../middleware/protectRoute.js"

const router = express.Router()

router.post('/create-job',protectRoute,isAdminRoute,createJob)
router.get('/jobs',getJobs)

export default router