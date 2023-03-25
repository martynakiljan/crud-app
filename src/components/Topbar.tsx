/** @format */

import React from "react";
import { Typography, AppBar, Toolbar } from "@material-ui/core";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { ToolbarInner } from "../utilis/styledcomponents";

const Topbar = () => {
  function refreshPage() {
    window.location.reload();
  }

  return (
    <AppBar position="sticky" color="secondary">
      <Toolbar>
        <ToolbarInner onClick={refreshPage}>
          <PeopleOutlineIcon sx={{ m: 2 }} />
          <Typography variant="h6" component="h6">
            CRUD App
          </Typography>
        </ToolbarInner>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
