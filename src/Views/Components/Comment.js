import React from "react";
import "./Comment.css";

function Comment({ username, comment }) {
  return (
    <div className="comment">
      <p>
        <strong>{username}</strong> {comment}
      </p>
    </div>
  );
}

export default Comment;
