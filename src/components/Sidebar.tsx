import Drawer from "@mui/material/Drawer";
import useStore from "../hooks/useStore";
import Section from "./Section";

export default function Sidebar() {
  const levels = useStore((state) => state.levels);
  const drawerOpen = useStore((state) => state.drawerOpen);
  return (
    <Drawer
      open={drawerOpen}
      onClose={() => {
        useStore.getState().set({ drawerOpen: false });
      }}
    >
      <Section steps={levels} />
    </Drawer>
  );
}
