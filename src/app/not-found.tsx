import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h6">The requested resource was not found</Typography>
      <Link href="/" passHref>
        <Button variant="contained" startIcon={<ArrowBackIosIcon />}>
          Back to Home
        </Button>
      </Link>
    </Box>
  );
}
