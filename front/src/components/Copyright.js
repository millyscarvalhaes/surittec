import React from "react";
import { Typography, Link } from "@mui/material";

export const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://localhost:3000">
        Millys Carvalhaes
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
