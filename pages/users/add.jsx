import { Layout, AddEdit } from "components/users";

export default Add;

function Add() {
  return (
    <Layout>
      <h1 className="font-bold text-xl block text-center my-5">Add User</h1>{" "}
      <AddEdit />
    </Layout>
  );
}
