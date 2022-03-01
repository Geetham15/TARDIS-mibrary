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
  setPendingRentalsPerUser,
  socket,
  setPendingRentals,
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
    setPendingRentals((old) => {
      return old.map((book) => {
        if (
          book.book_borrowing_id === pendingRentalsPerUser[0]?.bookBorrowingId
        ) {
          return { ...book, bookStatus: "reserved" };
        } else {
          return book;
        }
      });
    });
    socket.current.emit("updatePendingStatus", {
      ...data,
      bookOwnerId: pendingRentalsPerUser[0]?.bookowner_id,
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
    socket.current.emit("confirmRental", {
      bookBorrowingId: pendingRentalsPerUser[0]?.book_borrowing_id,
      userId: pendingRentalsPerUser[0]?.bookborrower_id,
    });
    setPendingRentals((old) => {
      return old.filter((book) => {
        return (
          book.book_borrowing_id !== pendingRentalsPerUser[0]?.book_borrowing_id
        );
      });
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
    setPendingRentalsPerUser((old) => {
      return old.map((book, index) => {
        if (index === 0) {
          return { ...book, bookStatus: "pending" };
        } else {
          return book;
        }
      });
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
