import { useState } from "react";
import { Grid, Button, Link, Typography, Box, Paper } from "@mui/material";
import { styled } from "@mui/styles";
import UserBooks from "../components/UserBooks.js";
import AddBooks from "../components/AddBooks";
import DataTable from "../components/Dashboard/DataTable";
import NavBar from "../components/NavBar";
import ChangePostalCode from "../components/ChangePostalCode";
import Footer from "../components/Footer";

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
  return (
    <div>
      <NavBar />
      <Box sx={{ flexGrow: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Item>
              <Button component={Link}>Books on Loan</Button>
              <DataTable  /> 
              <ChangePostalCode />
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item>
              {" "}
              <Button component={Link}>Books for Loan</Button>{" "}
              <UserBooks books={books} setBooks={setBooks} />
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item>
              <Button component={Link}>Outstanding Loans</Button>
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

      {/* <Footer />  */}
    </div>
  );
};

export default UserDashboard;
