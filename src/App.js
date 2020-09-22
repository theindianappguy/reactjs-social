import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db, auth } from "./firebase";
import AuthDialogs from "./authModal";
import { Button } from "@material-ui/core";
import ImageUpload from "./ImageUpload";

function App() {
  const [posts, setPosts] = useState([]);
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
  /// useEffect -> runs a piece of code baded on a specific condition
  useEffect(() => {
    // this is where the code runs
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
    });
  }, []);

  return (
    <div className="app">
      {/* Upload Option */}
      {user ? (
        <ImageUpload username={user?.displayName} />
      ) : (
        <p>Login to Post</p>
      )}

      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
          alt=""
        />
        {user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ) : (
          <AuthDialogs label="Login/Register" />
        )}
      </div>

      {posts.map(({ id, post }) => (
        <Post
          key={id}
          userProfileUrl={post.userProfileUrl}
          userName={post.userName}
          postImageUrl={post.postImageUrl}
        />
      ))}
    </div>
  );
}

export default App;
