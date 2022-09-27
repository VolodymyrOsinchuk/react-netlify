import { Typography } from "@material-ui/core";
import React from "react";
import coffe from "../assets/images/cofee.jpg";

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
        src={coffe}
        alt="coffe "
        height="400px"
        style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
      />
    </div>
  );
}
