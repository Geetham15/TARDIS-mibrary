import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog({ pendingRentals }) {
  const [open, setOpen] = useState(false);
  const [currentDateBorrowed, setDateBorrowed] = useState();
  const [dateDueForReturn, setDateDueForReturn] = useState();
  const [bookStatus, setBookStatus] = useState();

  const updatePendingRental = async () => {
    let data = {
      bookBorrowingId: pendingRentals[0]?.book_borrowing_id,
      dateBorrowed: currentDateBorrowed,
      dateDueForReturn: dateDueForReturn,
      bookStatus: "reserved",
    };
    console.log(data);
    let response = await fetch("/api/updatePendingRental", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    response = await response.json();
    alert(response.message);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        style={{ width: "100%" }}
        onClick={handleClickOpen}
      >
        Open rental form
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Rent</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill out this form to confirm your rental.
          </DialogContentText>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={pendingRentals[0]?.title}
            readOnly
          />
          <label htmlFor="author">Author</label>
          <input
            id="author"
            name="author"
            type="text"
            value={pendingRentals[0]?.authors}
            readOnly
          />
          <label htmlFor="condition">Condition</label>
          <input
            id="condition"
            name="condition"
            type="text"
            value={pendingRentals[0]?.condition}
            readOnly
          />
          <label htmlFor="dateBorrowed">Pickup date</label>
          <input
            type="date"
            name="dateBorrowed"
            value={currentDateBorrowed}
            onChange={(e) => setDateBorrowed(e.target.value)}
            required
          />
          <label htmlFor="dueDateForReturn">Due Date</label>
          <input
            type="date"
            name="dueDateForReturn"
            value={dateDueForReturn}
            onChange={(e) => setDateDueForReturn(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              updatePendingRental();
              handleClose();
            }}
          >
            Request
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
