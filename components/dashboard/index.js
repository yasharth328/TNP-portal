import Card from "./card";
import { userService } from "services";
import FormData from "./form";
import { FetchData } from "helpers/fetchData";
import { Spinner } from "components";

export default DashBoard;
function DashBoard() {
  const plateForm = ["leetcode", "interviewbit", "codeforces", "spoj"];
  const userNames = userService.userValue?.accounts;
  return (
    <div>
      {!userService.userValue?.accounts.length ? (
        <FormData></FormData>
      ) : (
        <div className="grid grid-flow-col gap-2">
          {userNames.map((userName, index) => {
            if (userName !== "") {
              const { data, error } = FetchData(userName, plateForm[index]);
              if (error)
                return (
                  <h1>{`${error} check userName : {${userName}} or try after someTime`}</h1>
                );
              if (!data) return <Spinner></Spinner>;
              let solved_status;
              switch (index) {
                case 0:
                  solved_status =
                    " Problems solved -> " + data.total_problems_solved;
                  break;
                case 1:
                  solved_status =
                    "Rank -> " + data.rank + " Score -> " + data.score;
                  break;
                  s;
                case 2:
                  solved_status = "Rank ->" + data.rank + " Rating-> " + data.rating;
                  break;
                case 3:
                  solved_status =
                    "Rank -> " + data.rank + " Rating: " + data.rating;
                  break;
              }
              return (
                <Card
                  plat={plateForm[index]}
                  userName={userName}
                  solved={solved_status}
                ></Card>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}
