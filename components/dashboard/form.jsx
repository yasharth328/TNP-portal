import { alertService, userService } from "services";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default FormData;

function FormData() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // fetch user and set default form values if in edit mode
  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    let accounts = [];
    for (const i = 0; i < 4; ++i) {
      accounts.push(e.target[i].value);
    }
    userService.update(userService.userValue?.ErNo, { accounts });
    alertService.info("Accounts added successfully.");
    alertService.info("Please login again");
    router.push("/jobs");
  }
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col border-2 rounded px-3 py-2 w-[1/2] md:w-[1/3]"
    >
      <label>Enter LeetCode userName</label>
      <input type="text" className="border-2 m-2 px-3"></input>
      <label>Enter InterviewBit userName</label>
      <input type="text" className="border-2 m-2 px-3"></input>
      <label>Enter CodeForces userName</label>
      <input type="text" className="border-2 m-2 px-3"></input>
      <label>Enter SPOJ userName</label>
      <input type="text" className="border-2 m-2 px-3"></input>
      <button type="submit" className="btn">
        submit
      </button>
    </form>
  );
}
