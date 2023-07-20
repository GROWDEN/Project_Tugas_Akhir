import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Img from "../images/blog.jpg";

const UserDashboard = () => {
  const { user } = useSelector((state) => state.userProfile);

  return (
    <Box
      sx={{
        backgroundImage: `url(${Img})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        p: 3,
        height: "100vh",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          p: 3,
          maxWidth: "1400px",
        }}
      >
        <h1 style={{ color: "black" }}>Dashboard</h1>
        <p style={{ color: "black" }}>Complete name: {user && user.name}</p>
        <p style={{ color: "black" }}>E-mail: {user && user.email}</p>
        <p style={{ color: "black" }}>Role: {user && user.role}</p>
      </Box>
    </Box>
  );
};

export default UserDashboard;
