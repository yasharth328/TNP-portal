import { useState, useEffect } from "react";

import { Link } from "components";
import { jobService, userService } from "services";
import { JobCard } from "components/jobs/Jobcard";
import Footer from "components/dashboard/footer";

export default Index;

function Index() {
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    jobService.getAll().then((x) => setJobs(x));
  }, []);

  function deleteJob(id) {
    setJobs(
      jobs.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    jobService.delete(id).then(() => {
      setJobs((jobs) => jobs.filter((x) => x.id !== id));
    });
  }

  return (
    <div>
      <h1 className="text-2xl text-center font-bold m-3 p-5 underline underline-offset-2">JOBS</h1>

      {userService.userValue?.role === "admin" ? (
        <>
          <Link
            href="/jobs/add"
            className="block w-1/4 px-2 py-2 mx-auto my-2 font-bold text-center text-white bg-indigo-700 border-2 rounded-md hover:bg-indigo-900"
          >
            Add Job
          </Link>
          <div className="p-5">
            <table className="table table-auto md:table-fixed min-w-full text-center">
              <thead className="text-white bg-gray-800 border-b">
                <tr>
                  <th className="px-6 py-4 text-sm font-medium text-white">
                    id
                  </th>
                  <th className="px-6 py-4 text-sm font-medium text-white">
                    Job Role
                  </th>
                  <th className="px-6 py-4 text-sm font-medium text-white">
                    Company
                  </th>
                  <th className="px-6 py-4 text-sm font-medium text-white">
                    Job Type
                  </th>
                  <th className="px-6 py-4 text-sm font-medium text-white">
                    Dates
                  </th>
                  <th className="px-6 py-4 text-sm font-medium text-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {jobs &&
                  jobs.map((job) => (
                    <tr key={job.id} className="border-b hover:bg-gray-200">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                        {job.id}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                        {job.role}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap font-bold">
                        {job.company}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                        {job.extras.jobType}
                      </td>
                      <td className="text-left">
                        <span className="text-green-500">Start:</span>{" "}
                        {job.extras.startDate}
                        <br /> <span className="text-red-500">End:</span>{" "}
                        {job.extras.endDate}
                      </td>
                      <td style={{ whiteSpace: "nowrap" }}>
                        <div className="flex xl:flex-row xl:gap-2 flex-col">
                          <Link
                            href={`/jobs/edit/${job.id}`}
                            className="mx-auto my-1 btn"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => deleteJob(job.id)}
                            className="mx-auto my-1 btn-del"
                            disabled={job.isDeleting}
                          >
                            {job.isDeleting ? (
                              <span className="spinner-border spinner-border-sm"></span>
                            ) : (
                              <span>Delete</span>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                {!jobs && (
                  <tr>
                    <td colSpan="4" className="text-center">
                      <div className="spinner-border spinner-border-lg align-center"></div>
                    </td>
                  </tr>
                )}
                {jobs && !jobs.length && (
                  <tr>
                    <td colSpan="6" className="text-center">
                      <div className="p-2 text-xl font-mono font-bold">
                        No jobs To Display,{" "}
                        <span className="text-base underline underline-offset-2 text-red-500">
                          {" "}
                          Add Job First
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
          <div className="grid grid-flow-row md:grid-flow-col gap-4 m-5">
            {jobs &&
              jobs.map((job) => {
                return (
                  <JobCard key={job.id} id={job.id} details={job}></JobCard>
                );
              })}
          </div>
      )}
      <Footer></Footer>
    </div>
  );
}
