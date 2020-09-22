import React, { useState, useEffect } from "react";
import Feed from "./Components/Feed";
import { auth } from "../firebase";
import Header from "../Views/Components/Header";
import CreatePost from "../Views/Components/CreatePost";

function Home() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in...
        console.log(authUser);
        setUser(authUser);
        console.log("user has logged in");
      } else {
        // user has logged out..
        setUser(null);
        console.log("user has logged out");
      }
    });

    return () => {
      // perform some cleanup actions
      unsubscribe();
    };
  }, []);
  return (
    <div className="home">
      <Header user={user} />

      <div className="app__body">
        {/* Upload Option */}
        <CreatePost user={user} />

        <Feed user={user} />
      </div>
    </div>
  );
}

export default Home;
