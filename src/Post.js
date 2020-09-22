import React, { useState } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Button, Menu, MenuItem } from "@material-ui/core";

function Post({ userProfileUrl, userName, postImageUrl }) {
  const [showEditOPtions, setShowEditOPtions] = useState();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="post">
      <div className="post__header">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Avatar alt="SanskarTiwari" src={userProfileUrl} />
          <div className="post__headerInfo">
            <h4>{userName}</h4>
            <p style={{ fontSize: "12px" }}>@theindianappguy</p>
          </div>
        </div>

        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
      {/* headr --> avatar + username + time */}

      {/* image */}
      <img className="post__image" src={postImageUrl} />

      {/* username + caption */}
      <div className="post__bottom">
        <p>
          <strong>theindianappguy</strong> this is caption i like this
        </p>
      </div>
    </div>
  );
}

export default Post;
