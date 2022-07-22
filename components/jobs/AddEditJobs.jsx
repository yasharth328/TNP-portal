import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "components";
import { alertService } from "services";
import { parse, isDate } from "date-fns";
import { jobService } from "services";

export { AddEditJob };
const re = /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

const today = new Date();
function parseDateString(value, originalValue) {
  if (isDate(value)) {
    return value;
  }
  return parse(originalValue, "yyyy-MM-dd", new Date());
}

function AddEditJob(props) {
  const job = props?.job;
  const isAddMode = !job;
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    description: Yup.string().required("Description is required"),
    company: Yup.string().required("Company is required"),
    website: Yup.string().matches(re, 'Enter correct url!').required(),
    salary: Yup.number().min(0, "Salary must be greater than 0").required(),
    role: Yup.string().required("Role is required"),
    jobType: Yup.string().required("Job Type is required"),
    // startDate: Yup.date()
    //   .required("Start Date is Required")
    //   .transform(parseDateString)
    //   .min(today),
    // EndDate: Yup.date()
    //   .required("End Date is Required")
    //   .transform(parseDateString)
    // //   .max(today),
    //   // .when("Event Start Date", (startDate, schema) =>
    //   //   startDate && schema.min(startDate)
    //   // ),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // set default form values if in edit mode
  if (!isAddMode) {
    formOptions.defaultValues = props.job;
  }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    return (isAddMode ? createJob(data) : updateJob(job.id, data));
  };



  function createJob(data) {
    return jobService
      .create(data)
      .then(() => {
        alertService.success("Job added", { keepAfterRouteChange: true });
        router.push(".");
      })
      .catch(alertService.error);
  }
  function updateJob(id, data) {
    return jobService
      .update(id, data)
      .then(() => {
        alertService.success("Job updated", { keepAfterRouteChange: true });
        router.push("..");
      })
      .catch(alertService.error);
  }

  return (
    <div className="w-1/2 h-full mx-auto md:w-1/3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-center h-full gap-2 mx-auto">
          <label className="font-bold">Job Role</label>
          <input
            name="role"
            type="text"
            {...register("role")}
            className={`input`}
          />
          <div className="text-red-500">{errors.role?.message}</div>

          <label className="font-bold">Job Type</label>
          <select
            name="jobType"
            type="text"
            {...register("jobType")}
            className={`input`}
          >
            <option value="Internship">Internship</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
          </select>

          <label className="font-bold">Job Description</label>
          <input
            name="description"
            type="text"
            {...register("description")}
            className={`input`}
          />
          <div className="text-red-500">{errors.description?.message}</div>

          <label className="font-bold">Company Name</label>
          <input
            name="company"
            type="text"
            {...register("company")}
            className={`input`}
          />
          <div className="text-red-500">{errors.company?.message}</div>

          <label className="font-bold">website</label>
          <input
            name="website"
            type="text"
            {...register("website")}
            className={`input`}
          />
          <div className="text-red-500">{errors.website?.message}</div>

          <label className="font-bold">Salary</label>
          <input
            name="salary"
            type="number"
            {...register("salary")}
            className={`input`}
          />
          <div className="text-red-500">{errors.salary?.message}</div>

          <label className="font-bold">Start Date</label>
          <input
            name="startDate"
            type="date"
            {...register("startDate")}
            className={`input`}
          />
          <div className="text-red-500">{errors.startDate?.message}</div>

          <label className="font-bold">Last Date to Apply</label>
          <input
            name="endDate"
            type="date"
            {...register("endDate")}
            className={`input`}
          />
          <div className="text-red-500">{errors.endDate?.message}</div>

          <button
            type="submit"
            disabled={formState.isSubmitting}
            className="mr-2 btn btn-primary"
          >
            {formState.isSubmitting && (
              <span className="mr-1 spinner-border spinner-border-sm animate-spin"></span>
            )}
            Submit
          </button>
          <button
            onClick={() => reset(formOptions.defaultValues)}
            type="button"
            disabled={formState.isSubmitting}
            className="btn btn-secondary"
          >
            Reset
          </button>
          <Link href="/jobs" className="btn btn-link">
            Cancel
          </Link>
        </div>
      </form>
    </div>);
}
