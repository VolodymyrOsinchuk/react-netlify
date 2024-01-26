import React from "react";
import { Typography } from "@mui/material";
import coffee from "../assets/images/coffee.jpg";

export default function Home() {
  return (
    <div>
      <Typography
        variant="h3"
        align="center"
        style={{ color: "black", marginBottom: "16px" }}
      >
        Home
      </Typography>
      <img
        src={coffee}
        alt="coffe "
        height="400px"
        style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
      />
    </div>
  );
}
