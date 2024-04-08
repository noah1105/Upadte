import { useState } from "react";
import { auth, db } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

function Signup() {
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function registerUser(e) {
    e.preventDefault();

    try {
      // Create a new user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      //get the user
      const user = userCredential.user;

      //add user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
      });

      // redirect to profile page
      navigate("/profile");
    } catch (error) {
      console.error("Error in Registration: ", error.message);
    }
  }

  return (
    <div>
      <h1> Register on my cool app! </h1>

      <form onSubmit={registerUser}>
        <label>Username</label>
        <br />
        <input
          placeholder="Enter Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label> Email</label>
        <br />
        <input
          placeholder="enter email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <label>Password</label>
        <br />
        <input
          placeholder="enter password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <button>Register</button>
      </form>
    </div>
  );
}

export default Signup;
