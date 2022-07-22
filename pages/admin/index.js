import { userService } from "services";

export default Home;

function Home() {
  return (
    <div className="p-4">
      <div className="container">
        <h1 className="text-xl font-bold">
          Hi {userService.userValue?.firstName}!
        </h1>
      </div>
    </div>
  );
}
