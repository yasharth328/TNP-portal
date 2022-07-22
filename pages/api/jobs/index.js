import { JobsRepo } from "jobsHelper";

export default handler;

function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getJobs();
        case 'POST':
            return createJob();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    function getJobs() {
        const Jobs = JobsRepo.getAll();
        return res.status(200).json(Jobs);
    }
    
    function createJob() {
        try {
            JobsRepo.create(req.body);
            return res.status(200).json({});
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    }
}