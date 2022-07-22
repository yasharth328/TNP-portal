import { useState, useEffect } from "react";

import { NavLink } from ".";
import { userService } from "services";

export { Nav };

function Nav() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  function logout() {
    userService.logout();
  }

  // only show nav when logged in
  if (!user) return null;

  return (
    <nav>
      <div className="flex flex-row gap-5 p-5 text-xl text-white bg-black rounded-md mx-2 mt-2">
        {user.role === "admin" ? (
          <>
            <NavLink href="/admin" exact className="">
              Home
            </NavLink>
            <NavLink href="/users" className="">
              Users
            </NavLink>
          </>
        ) : (
          <>
            <NavLink href="/student" exact className="">
              Home
            </NavLink>
          </>
        )}
        <NavLink href="/jobs">Jobs</NavLink>
        <a onClick={logout} className="">
          Logout
        </a>
      </div>
    </nav>
  );
}
