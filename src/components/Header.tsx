import LightbulbIcon from "@mui/icons-material/Lightbulb";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import amber from "@mui/material/colors/amber";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import useStore from "../hooks/useStore";

export default function Header() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          edge="start"
          aria-label="Show Menu"
          onClick={() => {
            useStore.getState().set({ drawerOpen: true });
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" sx={{ flex: 1 }}>
          Web Development Skill Tree
        </Typography>
        <IconButton
          edge="end"
          aria-label="info"
          sx={{ color: amber[300] }}
          onClick={() => {
            useStore.getState().set({ legendOpen: true });
          }}
        >
          <LightbulbIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
