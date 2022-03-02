import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import RateUser from "./RateUser.js";
import { DialogContent } from "@mui/material";
import { DialogContentText } from "@mui/material";
import { DialogActions } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { IconButton } from "@mui/material";
import AuthenticationContext from "../AuthenticationContext.js";

export default function RatingDialog({ chattingWith }) {
  const handleClose = (value) => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const authContext = useContext(AuthenticationContext);

  const submitRating = async () => {
    let response = await fetch("/api/rateUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        raterId: authContext.userId,
        recipientId: chattingWith.id,
        rating,
      }),
    });
    response = await response.json();
    console.log(response);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <StarIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Rate user</DialogTitle>
        <DialogContent>
          <DialogContentText>Rate this user.</DialogContentText>
          <RateUser rating={rating} setRating={setRating}></RateUser>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

          <Button
            onClick={() => {
              submitRating();
              handleClose();
            }}
          >
            Submit rating
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
