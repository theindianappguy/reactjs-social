import React from "react";
import AuthDialogs from "../../authModal";
import { auth } from "../../firebase";
import { Menu, MenuItem } from "@material-ui/core";
import "./Header.css";
import Avatar from "@material-ui/core/Avatar";

function Header({ user }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="header">
      <img
        className="header__LeftLogo"
        src="https://firebasestorage.googleapis.com/v0/b/whatsapp-link-generator-5376e.appspot.com/o/images%2Freact%20social%20theindianappguy.png?alt=media&token=453609cf-32e5-45f3-b1c6-cd9cbbd5a90c"
        alt=""
      />
      {user ? (
        <div className="header__Right">
          {/* <button className="button" onClick={() => auth.signOut()}>
            
          </button> */}

          <Avatar
            className="header__RightProfileImg"
            onClick={handleClick}
            style={{ height: "25px", width: "25px" }}
          >
            {user.displayName?.charAt(0)}
          </Avatar>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={() => auth.signOut()}>Logout</MenuItem>
          </Menu>
        </div>
      ) : (
        <AuthDialogs label="Login/Register" />
      )}
    </div>
  );
}

export default Header;
