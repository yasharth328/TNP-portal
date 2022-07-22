import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Link } from "components";
import { Layout } from "components/account";
import { userService, alertService } from "services";

export default Register;

function Register() {
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("*Required"),
    lastName: Yup.string().required("*Required"),
    ErNo: Yup.number()
      .test("len", "Must be exactly 6 characters", (val) => {
        if (val) return val.toString().length === 6;
      })
      .required("Enrollment Number is required")
      .typeError("you must specify a number")
      .min(181000, "Enter valid Enrollment Number"),
    password: Yup.string()
      .required("*Required")
      .min(6, "Password must be at least 6 characters"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(user) {
    return userService
      .register(user)
      .then(() => {
        alertService.success("Registration successful", {
          keepAfterRouteChange: true,
        });
        router.push("login");
      })
      .catch(alertService.error);
  }

  return (
    <Layout>
      <div className="flex flex-col h-screen justify-center mx-auto gap-8">
        <h4 className="text-center text-2xl font-bold">Register</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <label className="font-bold">First Name</label>
              <input
                name="firstName"
                type="text"
                {...register("firstName")}
                className={`border-2 rounded-md p-2 ${errors.firstName ? "is-invalid" : ""
                  }`}
              />

            <div className="text-red-500">{errors.firstName?.message}</div>
            <label className="font-bold">Last Name</label>
            <input
              name="lastName"
              type="text"
              {...register("lastName")}
              className={`border-2 rounded-md p-2 ${errors.lastName ? "is-invalid" : ""
                }`}
            />
            <div className="text-red-500">{errors.lastName?.message}</div>
            <label className="font-bold">Enrollment No</label>
            <input
              name="ErNo"
              type="text"
              {...register("ErNo")}
              className={`border-2 rounded-md p-2 ${errors.ErNo ? "is-invalid" : ""
                }`}
            />
            <div className="text-red-500">{errors.ErNo?.message}</div>
            <label className="font-bold">Password</label>
            <input
              name="password"
              type="password"
              {...register("password")}
              className={`border-2 rounded-md p-2 ${errors.password ? "is-invalid" : ""
                }`}
            />
            <div className="text-red-500">{errors.password?.message}</div>
          </div>
          <button disabled={formState.isSubmitting} className="btn">
            {formState.isSubmitting && <span className=""></span>}
            Register
          </button>
          <Link href="/account/login" className="btn">
            Cancel
          </Link>
        </form>
      </div>
    </Layout>
  );
}
