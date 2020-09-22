import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import MuiAlert from "@material-ui/lab/Alert";
import { auth } from "./firebase";
import TextField from "@material-ui/core/TextField";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function AuthDialogs({ label }) {
  const [open, setOpen] = useState(false);
  //   const [openSnack, setOpenSnack] = useState(false);
  //   const [snackLabel, setSnackLabel] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //By Me

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const LogIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    // close when done.
    handleClose();
  };

  //   function showSnack(message) {
  //     setSnackLabel(message);
  //     setOpenSnack(true);
  //   }

  const SignUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: `${email.match(/^([^@]*)@/)[1]}`,
        });
      })
      .catch((error) => alert(error.message));

    // close when done.
    handleClose();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <Button onClick={handleClickOpen}>{label}</Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent dividers>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "400px",
              minWidth: "300px",
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Email"
              type="text"
              style={{ marginTop: "30px" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              placeholder="Password"
              type="password"
              value={password}
              style={{ marginTop: "20px" }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus type="submit" onClick={LogIn}>
            Login
          </Button>
          <Button autoFocus type="submit" onClick={SignUp} color="primary">
            SignUp
          </Button>
        </DialogActions>
        {/* <Snackbar
          open={openSnack}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            {snackLabel}
          </Alert>
        </Snackbar> */}
      </Dialog>
    </div>
  );
}
