import { useState, useEffect } from "react";

import { Link, Spinner } from "components";
import { Layout } from "components/users";
import { userService } from "services";

export default Index;

function Index() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    userService.getAll().then((x) => setUsers(x));
  }, []);

  function deleteUser(ErNo) {
    setUsers(
      users.map((x) => {
        if (x.ErNo === ErNo) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    userService.delete(ErNo).then(() => {
      setUsers((users) => users.filter((x) => x.ErNo !== ErNo));
    });
  }

  return (
    <Layout>
      <Link
        href="/users/add"
        className="block w-1/4 px-2 py-2 mx-auto font-bold text-center text-white bg-indigo-700 border-2 rounded-md hover:bg-indigo-900 mt-4"
      >
        Add User
      </Link>
      <div className="p-5">
        <table className="min-w-full text-center">
          <thead className="text-white bg-gray-800 border-b">
            <tr>
              <th className="px-6 py-4 text-base font-medium text-white">
                Enrollment Number
              </th>
              <th className="px-6 py-4 text-base font-medium text-white">
                First Name
              </th>
              <th className="px-6 py-4 text-base font-medium text-white">
                Last Name
              </th>
              <th className="px-6 py-4 text-base font-medium text-white">Role</th>
              <th className="px-6 py-4 text-base font-medium text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user.ErNo} className="border-b hover:bg-gray-200">
                  <td className="px-6 py-4 text-base font-bold text-gray-900 whitespace-nowrap">
                    {user.ErNo}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {user.firstName}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {user.lastName}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{user.role}</td>
                  <td>
                    <div className="flex flex-row gap-2">
                      <Link
                        href={`/users/edit/${user.ErNo}`}
                        className="mx-auto my-1 btn"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteUser(user.ErNo)}
                        className="mx-auto my-1 btn-del"
                        disabled={user.isDeleting}
                      >
                        {user.isDeleting ? (
                          <span className="spinner-border spinner-border-sm"></span>
                        ) : (
                          <span>Delete</span>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            {!users && (
              <tr>
                <td colSpan="4">
                  <Spinner />
                </td>
              </tr>
            )}
            {users && !users.length && (
              <tr>
                <td colSpan="4" className="text-center">
                  <div className="p-2">No Users To Display</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
