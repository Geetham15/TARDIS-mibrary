import { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AuthenticationContext from "../AuthenticationContext";

export default function FormDialog({
  pendingRentalsPerUser,
  socket,
  loadAllBooks,
  setIsPendingConfirmation,
}) {
  const [open, setOpen] = useState(false);
  const [currentDateBorrowed, setDateBorrowed] = useState();
  const [dateDueForReturn, setDateDueForReturn] = useState();
  const authContext = useContext(AuthenticationContext);

  useEffect(() => {
    if (pendingRentalsPerUser) {
      setDateBorrowed(pendingRentalsPerUser[0]?.dateBorrowed);
      setDateDueForReturn(pendingRentalsPerUser[0]?.dateDueForReturn);
    }
  }, []);

  useEffect(() => {
    setIsPendingConfirmation(() => {
      if (
        pendingRentalsPerUser[0]?.bookStatus === "reserved" &&
        pendingRentalsPerUser[0]?.bookborrower_id !== authContext.userId
      ) {
        return true;
      }
      return false;
    });
  }, [pendingRentalsPerUser]);
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

    await loadAllBooks(authContext.userId, {
      booksRented: false,
      booksOwned: false,
      lentBooks: false,
      pending: true,
    });

    socket.current.emit("updateAllBooks", {
      id: pendingRentalsPerUser[0]?.bookowner_id,
      options: {
        booksRented: false,
        booksOwned: false,
        lentBooks: false,
        pending: true,
      },
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

    await loadAllBooks(authContext.userId, {
      booksRented: false,
      booksOwned: false,
      lentBooks: true,
      pending: true,
    });

    socket.current.emit("updateAllBooks", {
      id: pendingRentalsPerUser[0]?.bookborrower_id,
      options: {
        booksRented: true,
        booksOwned: false,
        lentBooks: false,
        pending: true,
      },
    });

    alert(response.message);
  };

  const denyRental = async () => {
    let data = {
      bookBorrowingId: pendingRentalsPerUser[0]?.book_borrowing_id,
      bookStatus: "pending",
    };
    console.log(data);
    let response = await fetch("/api/confirmRental", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    response = await response.json();

    await loadAllBooks(authContext.userId, {
      booksRented: false,
      booksOwned: false,
      lentBooks: true,
      pending: true,
    });

    socket.current.emit("updateAllBooks", {
      id: pendingRentalsPerUser[0]?.bookborrower_id,
      options: {
        booksRented: true,
        booksOwned: false,
        lentBooks: false,
        pending: true,
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
      {pendingRentalsPerUser[0]?.bookStatus === "pending" &&
        pendingRentalsPerUser[0]?.bookborrower_id === authContext.userId && (
          <Button
            variant="outlined"
            style={{ width: "100%" }}
            onClick={handleClickOpen}
          >
            Fill rental form
          </Button>
        )}
      {pendingRentalsPerUser[0]?.bookStatus === "reserved" &&
        pendingRentalsPerUser[0]?.bookborrower_id !== authContext.userId && (
          <Button
            variant="outlined"
            style={{ width: "100%" }}
            onClick={handleClickOpen}
          >
            Confirm rental
          </Button>
        )}

      {pendingRentalsPerUser[0]?.bookStatus === "reserved" &&
        pendingRentalsPerUser[0]?.bookborrower_id === authContext.userId && (
          <Button
            variant="outlined"
            style={{ width: "100%" }}
            onClick={handleClickOpen}
            disabled
          >
            Awaiting confirmation
          </Button>
        )}

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
          {pendingRentalsPerUser[0]?.bookStatus === "reserved" && (
            <Button
              onClick={() => {
                denyRental();
                handleClose();
              }}
            >
              Deny
            </Button>
          )}

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
