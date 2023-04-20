import CheckIcon from "@mui/icons-material/Check";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { getProperty } from "dot-prop";

import { LevelProps } from "../types";
import useStore from "../hooks/useStore";

export default function Level({ step, isAvailable }: LevelProps) {
  const levels = useStore((state) => state.levels);
  const showStartButton = !step.started && isAvailable;
  const showFinishButton = step.started && !step.done;
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      justifyContent="space-between"
    >
      <Box component="span">
        {step.done && (
          <Tooltip disableInteractive title="Done">
            <CheckIcon sx={{ ml: 2, mr: 1, color: "success.main" }} />
          </Tooltip>
        )}
        {!isAvailable &&
          !showFinishButton &&
          !step.done &&
          (step.dependencies.length > 0 ? (
            <Tooltip
              disableInteractive
              title={`Requires: ${step.dependencies
                .map((dependency) => getProperty(levels, dependency).name)
                .join(", ")} to unlock`}
            >
              <LockIcon sx={{ ml: 2, mr: 1, color: "error.main" }} />
            </Tooltip>
          ) : (
            <LockIcon sx={{ ml: 2, mr: 1, color: "error.main" }} />
          ))}
        {!step.done && step.started && !showFinishButton && !showStartButton && (
          <Tooltip disableInteractive title="In Progress">
            <TimelapseIcon sx={{ ml: 2, mr: 1, color: "warning.main" }} />
          </Tooltip>
        )}
        {isAvailable && !step.started && !showFinishButton && !showStartButton && (
          <Tooltip disableInteractive title="Unlocked">
            <LockOpenIcon sx={{ ml: 2, mr: 1, color: "text.default" }} />
          </Tooltip>
        )}
      </Box>
      {showStartButton && (
        <Box component="span">
          <Tooltip disableInteractive title="Play">
            <IconButton
              aria-label="start"
              sx={{ my: -1 }}
              onClick={() => {
                useStore.getState().update(step.path, { started: true });
              }}
            >
              <PlayArrowIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      {showFinishButton && (
        <Box component="span">
          <Tooltip disableInteractive title="Finish">
            <IconButton
              autoFocus
              aria-label="finish"
              sx={{ my: -1 }}
              onClick={() => {
                useStore.getState().update(step.path, { done: true });
              }}
            >
              <SportsScoreIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      <Typography
        variant="overline"
        component="h2"
        sx={{ display: "flex", alignItems: "center" }}
      >
        {step.name}
        {step.required && (
          <Box component="sup" sx={{ mx: 0.5 }}>
            *
          </Box>
        )}
      </Typography>
    </Stack>
  );
}
