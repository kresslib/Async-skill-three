import CheckIcon from "@mui/icons-material/Check";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

import useStore from "../hooks/useStore";

export default function Legend() {
  const legendOpen = useStore((state) => state.legendOpen);

  return (
    <Dialog
      open={legendOpen}
      onClose={() => {
        useStore.getState().set({ legendOpen: false });
      }}
    >
      <DialogTitle>Legend</DialogTitle>
      <DialogContent>
        <List dense disablePadding sx={{ minWidth: 200 }}>
          <ListItem disableGutters sx={{ gap: 1 }}>
            <Typography
              sx={{ width: 24, display: "flex", justifyContent: "center" }}
            >
              *
            </Typography>
            <Typography variant="caption">Required</Typography>
          </ListItem>
          <ListItem disableGutters sx={{ gap: 1 }}>
            <LockOpenIcon sx={{ color: "text.default" }} />
            <Typography variant="caption">Unlocked</Typography>
          </ListItem>
          <ListItem disableGutters sx={{ gap: 1 }}>
            <LockIcon sx={{ color: "error.main" }} />
            <Typography variant="caption">Locked</Typography>
          </ListItem>
          <ListItem disableGutters sx={{ gap: 1 }}>
            <TimelapseIcon sx={{ color: "warning.main" }} />
            <Typography variant="caption">In Progress</Typography>
          </ListItem>
          <ListItem disableGutters sx={{ gap: 1 }}>
            <PlayArrowIcon sx={{ color: "text.default" }} />
            <Typography variant="caption">Not Started</Typography>
          </ListItem>
          <ListItem disableGutters sx={{ gap: 1 }}>
            <SportsScoreIcon sx={{ color: "text.default" }} />
            <Typography variant="caption">Started</Typography>
          </ListItem>
          <ListItem disableGutters sx={{ gap: 1 }}>
            <CheckIcon sx={{ color: "success.main" }} />
            <Typography variant="caption">Done</Typography>
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  );
}
