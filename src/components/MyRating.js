import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function MyRating({ myRating }) {
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      {myRating ? (
        <>
          <Typography component="legend">My Rating</Typography>
          <Rating name="read-only" value={myRating} precision={0.1} readOnly />
        </>
      ) : (
        <>
          <Typography component="legend">No ratings yet</Typography>
          <Rating name="no-value" value={null} readOnly />
        </>
      )}
    </Box>
  );
}
