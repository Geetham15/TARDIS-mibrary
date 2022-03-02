import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AuthenticationContext from "../AuthenticationContext";

export default function FormDialogReturn({
  booksRentedPerUser,
  socket,
  loadAllBooks,
}) {
  const [open, setOpen] = useState(false);
  const authContext = useContext(AuthenticationContext);
  const initiateReturn = async () => {
    let data = {
      bookBorrowingId: booksRentedPerUser[0]?.book_borrowing_id,
      bookStatus: "return",
    };
    let response = await fetch("/api/initiateReturn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    response = await response.json();
    await loadAllBooks(authContext.userId, {
      booksRented: true,
      booksOwned: false,
      lentBooks: false,
      pending: false,
    });

    socket.current.emit("updateAllBooks", {
      id: booksRentedPerUser[0]?.bookowner_id,
      options: {
        booksRented: false,
        booksOwned: false,
        lentBooks: true,
        pending: false,
      },
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
      {booksRentedPerUser[0]?.bookStatus === "Lend" && (
        <Button
          variant="outlined"
          style={{ width: "100%" }}
          onClick={handleClickOpen}
        >
          Initiate Return
        </Button>
      )}

      {booksRentedPerUser[0]?.bookStatus === "return" && (
        <Button
          variant="outlined"
          style={{ width: "100%" }}
          onClick={handleClickOpen}
          disabled
        >
          Awaiting return confirmation
        </Button>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Initiate Return</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do this if you are currently meeting with the book's owner and you
            are ready to return.
          </DialogContentText>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={booksRentedPerUser[0]?.title}
            readOnly
          />
          <label htmlFor="author">Author</label>
          <input
            id="author"
            name="author"
            type="text"
            value={booksRentedPerUser[0]?.authors}
            readOnly
          />
          <label htmlFor="condition">Condition</label>
          <input
            id="condition"
            name="condition"
            type="text"
            value={booksRentedPerUser[0]?.condition}
            readOnly
          />
          <label htmlFor="dateBorrowed">Pickup date</label>

          <p>{booksRentedPerUser[0]?.dateBorrowed}</p>

          <label htmlFor="dueDateForReturn">Due Date</label>

          <p>{booksRentedPerUser[0]?.dateDueForReturn}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

          <Button
            onClick={() => {
              initiateReturn();
              handleClose();
            }}
          >
            Return
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
