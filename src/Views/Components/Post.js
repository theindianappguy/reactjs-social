import React from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../../firebase";
import CommentInput from "./CommentInput";
import Comment from "./Comment";

function Post({ id, userName, postImageUrl, caption, comments, user }) {
  const deletePost = () => {
    //delete post
    db.collection("posts")
      .doc(id)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <div className="post">
      <div className="post__header">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            alt={userName.toLowerCase()}
            style={{ height: "25px", width: "25px" }}
          >
            {userName.charAt(0)}
          </Avatar>
          <div className="post__headerInfo">
            <p style={{ fontSize: "14px" }}>{userName}</p>
          </div>
        </div>

        {user ? (
          user.displayName.toLowerCase() === userName.toLowerCase() ? (
            <button
              className="button"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={deletePost}
            >
              Delete
            </button>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </div>
      {/* headr --> avatar + username + time */}

      {/* image */}
      <img className="post__image" src={postImageUrl} />

      {/* username + caption */}
      <div className="post__bottom">
        <p>
          <strong>{userName}</strong> {caption}
        </p>
      </div>
      {comments ? (
        comments.map((comment) => (
          <Comment username={comment.username} comment={comment.comment} />
        ))
      ) : (
        <></>
      )}
      <CommentInput comments={comments} id={id} user={user} />
    </div>
  );
}

export default Post;
