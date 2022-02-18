import { React, useContext } from "react";
import Map from "../components/Map";
import Search from "../components/Search.js";
import AuthenticationContext from "../AuthenticationContext";
import Login from "./Login.js";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Home({ bookData, setBookData }) {
  const authContext = useContext(AuthenticationContext);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {authContext.username ? (
        <Card
          sx={{
            minWidth: 275,
            maxWidth: 1000,
            minHeight: 300,
            maxHeight: 1000,
          }}
          style={{ marginTop: 20 }}
        >
          <CardContent>
            <Search bookData={bookData} setBookData={setBookData} />
            <Map bookData={bookData} />
          </CardContent>
          {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </Card>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
}

export default Home;
