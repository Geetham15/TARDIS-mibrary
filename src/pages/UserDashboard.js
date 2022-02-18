import { useState, useContext, useEffect } from "react";
import {
  Grid,
  Button,
  Link,
  Typography,
  Box,
  Paper,
  ButtonGroup,
} from "@mui/material";
import { styled } from "@mui/styles";
import AddBooks from "../components/AddBooks";
import DataTable from "../components/Dashboard/DataTable";
import ChangePostalCode from "../components/ChangePostalCode";
import AuthenticationContext from "../AuthenticationContext";
import Avatar from "../components/userAvatar";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const UserDashboard = ({ books, setBooks }) => {
  const authContext = useContext(AuthenticationContext);
  const [bookData, setBookData] = useState({
    comments: "",
    condition: "gently used",
    isbn: "",
  });
  const [lentBooks, setLentBooks] = useState([]);
  const [tableDisplay, setTableDisplay] = useState(1);
  async function deleteBook(id) {
    console.log(id);
    setBooks(() => {
      let newBooks = books.filter((book) => {
        return book.id !== id;
      });
      return newBooks;
    });
    let response = await fetch("/api/deleteBook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, userId: authContext.userId }),
    });
    response = await response.json();
    if (response) {
      alert("Delete was successful");
    } else {
      alert("something went wrong");
    }
  }
  const columns1 = [
    {
      name: "id",
      options: {
        display: false,
      },
    },
    {
      name: "title",
      label: "Title",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "authors",
      label: "Author",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "condition",
      label: "Condition",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "comments",
      label: "Comments",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];
  const columns2 = [
    {
      name: "title",
      label: "Title",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "authors",
      label: "Author",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "condition",
      label: "Condition",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "dateBorrowed",
      label: "Date Borrowed",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "dateDueForReturn",
      label: "Date Due",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "username",
      label: "Borrowed By",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];
  const options1 = {
    filterType: "checkbox",
    serverSide: false,
    sort: true,
    onRowsDelete: (rowsDeleted) => {
      console.log(rowsDeleted.data);
      for (let i = 0; i < rowsDeleted.data.length; i++) {
        deleteBook(books[rowsDeleted.data[i].dataIndex].id);
      }
    },
  };
  const options2 = {
    filterType: "checkbox",
    serverSide: false,
    sort: true,
    selectableRows: false,
  };
  useEffect(() => {
    async function getLentBooks() {
      let result = await fetch(`/api/getLentBooks/${authContext.userId}`);
      result = await result.json();
      console.log(result);
      setLentBooks(result);
    }
    getLentBooks();
  }, [authContext.userId]);
  return (
    <div>
      <Box sx={{ flexGrow: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <Item>
              <Avatar />
              <Button component={Link}>Books on Loan</Button>
              <ChangePostalCode />
            </Item>
          </Grid>
          <Grid item xs={12} md={8}>
            <Item>
              <ButtonGroup
                variant="outlined"
                aria-label="outlined primary button group"
              >
                <Button
                  variant={tableDisplay === 1 ? "contained" : "outlined"}
                  onClick={() => setTableDisplay(1)}
                >
                  Owned
                </Button>
                <Button
                  variant={tableDisplay === 2 ? "contained" : "outlined"}
                  onClick={() => setTableDisplay(2)}
                >
                  Loaned
                </Button>
                <Button
                  variant={tableDisplay === 3 ? "contained" : "outlined"}
                  onClick={() => setTableDisplay(3)}
                >
                  Rented
                </Button>
              </ButtonGroup>
            </Item>
            <Item>
              {" "}
              {tableDisplay === 1 && (
                <>
                  <Button component={Link}>Books for Loan</Button>{" "}
                  <DataTable
                    books={books}
                    title="Owned"
                    columns={columns1}
                    setBooks={setBooks}
                    options={options1}
                  />
                </>
              )}
              {tableDisplay === 2 && (
                <>
                  <Button component={Link}>Books Loaned</Button>{" "}
                  <DataTable
                    columns={columns2}
                    books={lentBooks}
                    title="Loaned"
                    options={options2}
                  />
                </>
              )}
              {tableDisplay === 3 && (
                <>
                  <Button component={Link}>Books Rented</Button> <DataTable />
                </>
              )}
            </Item>
          </Grid>
          <Grid item xs={12} md={2}>
            <Item>
              <Button component={Link}>Outstanding Loans</Button>
              {/* <UserBooks/> */}
              <AddBooks
                bookData={bookData}
                setBookData={setBookData}
                setBooks={setBooks}
                books={books}
              />
            </Item>
          </Grid>
        </Grid>
      </Box>
      <Typography></Typography>
    </div>
  );
};

export default UserDashboard;
