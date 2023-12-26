import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import {
  // ArrowDropDownOutlined,
  SettingsOutlined,
  // SearchIcon,
  // MenuIcon,
  // DarkModeIcon,
  // LightModeIcon,
} from "@mui/icons-material";
import "../styles/navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../state";
import profileImage from "../assets/profile.jpeg";
import {
  AppBar,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  useTheme,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ isSidebarOpen, setIsSidebarOpen, user }) {
  const mode = useSelector((state) => state.global.mode);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left side */}
        <Box className="flexBetween">
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <Box
            className="flexBetween searchBox"
            sx={{
              backgroundColor: theme.palette.background.alt,
              gap: "3rem",
              borderRadius: "9px",
              padding: "0.1rem 1.5rem",
            }}
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>
        {/* Right side */}
        <Box>
          <Box className="flexBetween" gap="1.5rem">
            <Box
              onClick={() => dispatch(setMode())}
              title={mode !== "dark" ? "Dark mode" : "Light Mode"}
            >
              {mode === "dark" ? (
                <LightModeIcon />
              ) : (
                <DarkModeIcon sx={{ fontSize: "25px" }} />
              )}
            </Box>
            <Box title="Settings" onClick={handleClick}>
              <SettingsOutlined />
            </Box>
            {/* <Box display="flex" justifyContent="center" alignItems="center"> */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItem="center"
              textTransform="none"
              gap="1rem"
              onClick={() => navigate("/profile")}
              title="Profile"
            >
              <Box width="32px" height="32px" m="auto">
                <Box
                  component="img"
                  alt="profile"
                  src={profileImage}
                  height="100%"
                  width="100%"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                />
              </Box>
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user?.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user?.occupation}
                </Typography>
              </Box>
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem>LogOut</MenuItem>
              <MenuItem>chnage currency</MenuItem>
              <MenuItem>LogOut</MenuItem>
              <MenuItem>LogOut</MenuItem>
            </Menu>
            {/* </Box> */}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
