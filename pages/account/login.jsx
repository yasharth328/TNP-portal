import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Link } from "components";
import { Layout } from "components/account";
import { userService, alertService } from "services";

export default Login;

function Login() {
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    ErNo: Yup.number()
      .test("len", "Must be exactly 6 characters", (val) => {
        if (val) return val.toString().length === 6;
      })
      .required("Enrollment Number is required")
      .typeError("you must specify a number")
      .min(181000, "Enter valid Enrollment Number"),
    password: Yup.string().required("*Required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit({ ErNo, password }) {
    return userService
      .login(ErNo, password)
      .then(() => {
        // get return url from query parameters or default to '/'
        if (userService.userValue.role == "admin") {
          const returnUrl = "/admin";
          router.push(returnUrl);
        } else {
          const returnUrl = "/student";
          router.push(returnUrl);
        }
      })
      .catch(alertService.error);
  }

  return (
    <Layout>
      <div className="flex flex-col h-screen justify-center mx-auto gap-8">
        <h4 className="text-center text-2xl font-bold">Login</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <label className="font-bold" name="ErNo">Enrollment Number
              <input
                name="ErNo"
                type="text"
                {...register("ErNo")}
                className={`input block mt-2`}
              />
            </label>
            <div className="text-red-500">{errors.ErNo?.message}</div>
            <label name="password" className="font-bold">Password
              <input
                name="password"
                type="password"
                {...register("password")}
                className={`input block mt-2`}
              />
            </label>
            <div className="text-red-500">{errors.password?.message}</div>
          </div>
          <div className="flex flex-col text-center">
            <button disabled={formState.isSubmitting} className="btn">
              {formState.isSubmitting && <span className=""></span>}
              Login
            </button>
            <Link href="/account/register" className="btn">
              Register
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}
