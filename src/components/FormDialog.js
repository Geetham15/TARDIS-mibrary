import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog({
  pendingRentalsPerUser,
  setPendingRentalsPerUser,
}) {
  const [open, setOpen] = useState(false);
  const [currentDateBorrowed, setDateBorrowed] = useState();
  const [dateDueForReturn, setDateDueForReturn] = useState();
  const [bookStatus, setBookStatus] = useState();

  useEffect(() => {
    if (pendingRentalsPerUser) {
      setDateBorrowed(pendingRentalsPerUser[0]?.dateBorrowed);
      setDateDueForReturn(pendingRentalsPerUser[0]?.dateDueForReturn);
    }
  }, []);
  const updatePendingRental = async () => {
    let data = {
      bookBorrowingId: pendingRentalsPerUser[0]?.book_borrowing_id,
      dateBorrowed: currentDateBorrowed,
      dateDueForReturn: dateDueForReturn,
      bookStatus: "reserved",
    };
    let response = await fetch("/api/updatePendingRental", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    response = await response.json();
    setPendingRentalsPerUser((old) => {
      return { ...old, bookStatus: "reserved" };
    });
    alert(response.message);
  };

  const confirmRental = async () => {
    let data = {
      bookBorrowingId: pendingRentalsPerUser[0]?.book_borrowing_id,
      bookStatus: "Lend",
    };
    console.log(data);
    let response = await fetch("/api/confirmRental", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    response = await response.json();
    setPendingRentalsPerUser((old) => {
      return { ...old, bookStatus: "Lend" };
    });
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
        {pendingRentalsPerUser[0]?.bookStatus === "pending"
          ? "Fill rental form"
          : "Confirm rental"}
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
            value={pendingRentalsPerUser[0]?.title}
            readOnly
          />
          <label htmlFor="author">Author</label>
          <input
            id="author"
            name="author"
            type="text"
            value={pendingRentalsPerUser[0]?.authors}
            readOnly
          />
          <label htmlFor="condition">Condition</label>
          <input
            id="condition"
            name="condition"
            type="text"
            value={pendingRentalsPerUser[0]?.condition}
            readOnly
          />
          <label htmlFor="dateBorrowed">Pickup date</label>
          {pendingRentalsPerUser[0]?.bookStatus === "pending" ? (
            <input
              type="date"
              name="dateBorrowed"
              value={currentDateBorrowed}
              onChange={(e) => setDateBorrowed(e.target.value)}
              required
            />
          ) : (
            <p>{currentDateBorrowed}</p>
          )}
          <label htmlFor="dueDateForReturn">Due Date</label>
          {pendingRentalsPerUser[0]?.bookStatus === "pending" ? (
            <input
              type="date"
              name="dueDateForReturn"
              value={dateDueForReturn}
              onChange={(e) => setDateDueForReturn(e.target.value)}
              required
            />
          ) : (
            <p>{dateDueForReturn}</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              pendingRentalsPerUser[0]?.bookStatus === "pending"
                ? updatePendingRental()
                : confirmRental();
              handleClose();
            }}
          >
            {pendingRentalsPerUser[0]?.bookStatus === "pending"
              ? "Request"
              : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
