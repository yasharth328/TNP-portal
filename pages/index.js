import { userService } from "services";
import { useRouter } from "next/router";
export default Home;

function Home() {
  const router = useRouter();

  if (userService.userValue.role === "admin") {
    router.push({
      pathname: "/admin",
      query: { returnUrl: router.asPath },
    });
  } else {
    router.push({
      pathname: "/student",
      query: { returnUrl: router.asPath },
    });
  }
}
