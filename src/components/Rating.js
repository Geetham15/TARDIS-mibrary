import { useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function MyRating() {
  const [value, setValue] = useState(2);

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Typography component="legend">My rating</Typography>
      <Rating
        name="read-only"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        controlled
        onClick={console.log(value)}
      />
    </Box>
  );
}
