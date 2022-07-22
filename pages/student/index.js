import { userService } from "services";
import DashBoard from "components/dashboard";
export default Home;

function Home() {

  return (
    <div className="p-4">
      <div className="container">
        <h1 className="text-xl font-bold m-3 mb-5">
          Hi <span className="text-indigo-500 capitalize">{userService.userValue?.firstName}!</span> <span className="text-base font-medium">({userService.userValue?.ErNo})</span> 
        </h1>
        <DashBoard></DashBoard>
      </div>
    </div>
  );
}
