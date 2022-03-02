import { useState } from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Rating from "./Rating.js";
import { DialogContent } from "@mui/material";
import { DialogContentText } from "@mui/material";
import { DialogActions } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { IconButton } from "@mui/material";

export default function RatingDialog() {
  const handleClose = (value) => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const [open, setOpen] = useState(false);

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <StarIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Rate user</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Rate your most recent transaction.
          </DialogContentText>
          <Rating></Rating>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

          <Button
            onClick={() => {
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
