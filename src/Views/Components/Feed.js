import React, { useState, useEffect } from "react";
import Post from "./Post";
import { db } from "../../firebase";
import "./Feed.css";

function Feed({ user }) {
  const [posts, setPosts] = useState([]);

  /// useEffect -> runs a piece of code baded on a specific condition
  useEffect(() => {
    // this is where the code runs
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
    });
  }, []);
  return (
    <div className="feed">
      <div className="feed__posts">
        {posts.map(({ id, post }) => (
          <Post
            key={id}
            id={id}
            userProfileUrl={post.userProfileUrl}
            userName={post.userName}
            postImageUrl={post.postImageUrl}
            caption={post.caption}
            comments={post.comments}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}

export default Feed;
