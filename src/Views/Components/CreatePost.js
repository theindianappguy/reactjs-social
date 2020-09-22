import React, { useState } from "react";
import { storage, db } from "../../firebase";
import firebase from "firebase";
import "./CreatePost.css";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import CircularProgress from "@material-ui/core/CircularProgress";
import AuthDialogs from "../../authModal";

function CreatePost({ user }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      var src1 = URL.createObjectURL(e.target.files[0]);
      var preview1 = document.getElementById("image-1-preview");
      preview1.src = src1;
      preview1.style.display = "block";
    }
  };

  const handleUpload = () => {
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function .....
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          // Error function...
          console.log(error);
          alert(error.message);
        },
        () => {
          // upload complete function
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                postImageUrl: url,
                userName: user.displayName.toLowerCase(),
                userProfileUrl:
                  "https://avatars0.githubusercontent.com/u/55942632?s=460&u=f702a3d87d1f9c125f1ead9b3bec93d26cd3b3a0&v=4",
              });
            });

          setProgress(0);
          setCaption("");
          setImage(null);
          var preview1 = document.getElementById("image-1-preview");
          preview1.style.display = "none";
        }
      );
    }
  };

  const removeImage = () => {
    var preview1 = document.getElementById("image-1-preview");
    preview1.style.display = "none";
  };

  return (
    <div className="app__createPost">
      {user ? (
        <div className="imageUpload">
          <div className="createAPost__Top">
            <p>Create a Post</p>
          </div>
          {/* <progress value={progress} max="100" /> */}

          <div className="createAPost__center">
            <textarea
              className="createAPost__textarea"
              name="create a post"
              rows="2"
              value={caption}
              placeholder="Enter a caption..."
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>
            <div className="imagePreview">
              <img onClick={() => removeImage()} id="image-1-preview" alt="" />
              {progress === 0 ? (
                <></>
              ) : (
                <CircularProgress
                  className="circularProgress"
                  variant="determinate"
                  value={progress}
                />
              )}
            </div>
          </div>

          <div className="imageUpload__bottom">
            <div className="image-upload">
              <label htmlFor="file-input">
                <CameraAltIcon style={{ marginTop: "5px" }} />
              </label>

              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            <button
              className="button"
              onClick={handleUpload}
              style={{
                color: caption ? "gray" : "lightgrey",
                fontWeight: caption ? "600" : "500",
              }}
            >
              Upload
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AuthDialogs label="Login/Register" />
          <p>to Post</p>
        </div>
      )}
    </div>
  );
}

export default CreatePost;
