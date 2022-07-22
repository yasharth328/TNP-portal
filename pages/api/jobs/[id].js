import { JobsRepo } from "jobsHelper";

export default JobsHandler;

function JobsHandler(req, res) {
  switch (req.method) {
    case "GET":
      return getJobById();
    case "PUT":
      return updateJob();
    case "DELETE":
      return deleteJob();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  function getJobById() {
    const Job = JobsRepo.getById(req.query.id);
    return res.status(200).json(Job);
  }

  function updateJob() {
    try {
      JobsRepo.update(req.query.id, req.body);
      return res.status(200).json({});
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  function deleteJob() {
    JobsRepo.delete(req.query.id);
    return res.status(200).json({});
  }
}
