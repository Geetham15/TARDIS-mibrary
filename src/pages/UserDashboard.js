import { useState } from "react";
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
import Avatar from "../components/userAvatar";
import ReturnButton from "../components/ReturnButton";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const UserDashboard = ({ books, setBooks }) => {
  const [bookData, setBookData] = useState({
    comments: "",
    condition: "gently used",
  });
  const [tableDisplay, setTableDisplay] = useState(1);
  return (
    <div>
      <Box sx={{ flexGrow: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <Item>
              <Avatar />
              <Button component={Link}>Books on Loan</Button>
              {/* <DataTable  />  */}
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
                  <DataTable books={books} />
                </>
              )}
              {tableDisplay === 2 && (
                <>
                  <Button component={Link}>Books Loaned</Button> <DataTable />
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
