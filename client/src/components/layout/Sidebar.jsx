import React, {useState} from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

const items = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/catalog", label: "Course Catalog" },
  { to: "/my-learning", label: "My Learning" },
  { to: "/assessments", label: "Assessments" },
  { to: "/profile", label: "My Profile & Skills" },
  { to: "/resources", label: "Resources & Support" },
  { to: "/admin", label: "Admin/Lead Dashboard" },
  { to: "/register", label: "Register User" },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (!confirmed) return;

    localStorage.clear();
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    navigate("/", { state: { fromLogout: true } });
  };

  const changePassword = () => {
    navigate("/change-password");
  };

  return (
    <aside className="w-64 bg-white shadow-sm h-screen sticky top-0 flex flex-col justify-between">
      {/* Navigation */}
      <div>
        <List>
          {items.map((i) => {
            if (i.to === "/admin" && role !== "ADMIN" && role !== "LEAD")
              return null;
            if (i.to === "/register" && role !== "ADMIN" && role !== "LEAD") return null;
            return (
              <ListItemButton
                key={i.to}
                component={Link}
                to={i.to}
                selected={location.pathname === i.to}
              >
                <ListItemText primary={i.label} />
              </ListItemButton>
            );
          })}
        </List>
      </div>

      {/* Actions (Change Password + Logout) */}
      <div className="p-4 space-y-3">
        <button
          className="w-full py-2 px-4 rounded-xl text-black font-medium transition bg-indigo-300 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          onClick={changePassword}
        >
          Change Password
        </button>

        <Divider />

        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </aside>
  );
}
