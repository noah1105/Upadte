import Login from "../Login";
import Signup from "../SignUp";
import Avatar from "../components/Profile";

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Avatar />
      <Signup />
      <br />
      <Login />
    </div>
  );
}

export default Home;
