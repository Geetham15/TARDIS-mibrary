import { React, useContext } from "react";
import Map from "../components/Map";
import Search from "../components/Search.js";
import AuthenticationContext from "../AuthenticationContext";
import Login from "./Login.js";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function Home({
  bookData,
  setBookData,
  setIsChatOpen,
  setChattingWith,
  setPendingRentals,
}) {
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
            <Map
              bookData={bookData}
              setIsChatOpen={setIsChatOpen}
              setChattingWith={setChattingWith}
              setPendingRentals={setPendingRentals}
            />
          </CardContent>
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
