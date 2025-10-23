import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import api from "../api/api";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const UserProfileMenu = () => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user/", {
          headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    window.location.href = "/login";
  };

  if (!user) return null; // or a skeleton/loading indicator

  return (
    <Box>
      {/* Avatar Button */}
      <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
        <Avatar alt={user.username} src={user.profile_photo || ""} />
      </IconButton>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle1">{user.username}</Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </Box>
        <MenuItem onClick={handleMenuClose} component="a" href="/profile">
          Profile
        </MenuItem>
        <MenuItem onClick={handleMenuClose} component="a" href="/settings">
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserProfileMenu;
