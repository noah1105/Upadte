import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // ensure you import your Firestore instance
import ImageUploader from "../components/ImageUploader";

import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null); // state variable for username

  const navigate = useNavigate();

  async function fetchUserData(uid) {
    const docRef = doc(db, "users", uid);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      // assuming the user document has a field named 'username'
      return userData.username;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return null;
    }
  }

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // User is logged in
        setUser(currentUser);
        const username = await fetchUserData(currentUser.uid); // fetch username from Firestore
        setUsername(username); // set username state
      } else {
        // User is logged out
        setUser(null);
        setUsername(null); // clear username state
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []); // Empty dependency array means this effect runs once on mount

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      // After sign out, navigate to the home or login page
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (!user) {
    return <h2>You must be logged in to view this page.</h2>;
  }

  return (
    <div>
      <h1>Welcome, {user.email}!</h1>
      <h1>Welcome, {username}!</h1> {/* Display username instead of email */}
      {/* Other user-specific data */}
      <button onClick={handleLogout}>Logout</button>
      <ImageUploader />
    </div>
  );
}

export default Profile;
