"use client";

import type React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleAdminMode } from "../store/inventorySlice";
import type { RootState } from "../store";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state: RootState) => state.inventory.isAdmin);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Inventory Management
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={isAdmin}
                onChange={() => dispatch(toggleAdminMode())}
                color="secondary"
              />
            }
            label={isAdmin ? "Admin" : "User"}
          />
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </>
  );
};

export default Layout;
