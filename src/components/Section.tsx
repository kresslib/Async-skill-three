import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { getProperty } from "dot-prop";

import { SectionProps } from "../types";
import useStore from "../hooks/useStore";
import Level from "./Level";

export default function Section({ steps, isAvailable = true }: SectionProps) {
  const levels = useStore((state) => state.levels);
  return (
    <List dense disablePadding>
      {Object.entries(steps).map(([, step]) => {
        const isResolved = step.dependencies.every((dependency) => {
          const dependency_ = getProperty(levels, dependency);
          return !dependency_.required || dependency_.done;
        });
        const isAvailable_ =
          (step.dependencies.length === 0 || isResolved) && isAvailable;

        return (
          <ListItem
            key={step.id}
            sx={{
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center"
            }}
          >
            <Level step={step} isAvailable={isAvailable_} />
            {step.steps && (
              <Section steps={step.steps} isAvailable={isAvailable_} />
            )}
          </ListItem>
        );
      })}
    </List>
  );
}
