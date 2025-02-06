"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuList from "../molecules/MenuList";
import Link from "next/link";

/**
 * ヘッダー
 * @param param title: タイトル
 * @returns ヘッダー
 */
const Header: React.FC<{ title: string }> = ({ title }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // メニューを開く処理
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // メニューを閉じる処理
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Toolbar>
        <IconButton
          edge="start"
          color="default"
          aria-label="menu"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" component="div" align="center">
            {title}
          </Typography>
        </Box>
        <Link href={"/auth/profile"}>
          <IconButton color="default">
            <AccountCircleIcon />
          </IconButton>
        </Link>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuList />
        </Menu>
      </Toolbar>
      <hr></hr>
    </AppBar>
  );
};

export default Header;
