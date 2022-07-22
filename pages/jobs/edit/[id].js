import { AddEditJob } from "components/jobs/AddEditJobs";
import {jobService, alertService} from "services/index";
import { Spinner } from "components";
import {useState,useEffect} from 'react'
export default Edit;

function Edit({ id }) {
  const [job, setjob] = useState(null);
  useEffect(() => {
    // fetch job and set default form values if in edit mode
    jobService
      .getById(id)
      .then((x) => setjob(x))
      .catch(alertService.error);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {job ? <AddEditJob job={job} /> : <Spinner />}
    </>
  );
}

export async function getServerSideProps({ params }) {
//   const job = await jobService.getById(params.id);
  return {
    props: { id: params.id },
  };
}
