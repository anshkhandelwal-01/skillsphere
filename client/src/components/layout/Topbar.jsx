import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function Topbar() {

  return (
    <AppBar position="sticky" elevation={0} color="transparent">
      <Toolbar className="px-6">
        <Typography variant="h6" color="primary">
          SkillSphere
        </Typography>
        <div className="ml-auto">
          <IconButton>
            <Badge color="secondary" badgeContent={3}>
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
