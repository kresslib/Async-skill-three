import Box from "@mui/material/Box";

import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
//import ForceGraph3D from "3d-force-graph";
import ThreeForceGraph from "three-forcegraph";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import SpriteText from "three-spritetext";

import Header from "./components/Header";
import Legend from "./components/Legend";
import Sidebar from "./components/Sidebar";
import useStore from "./hooks/useStore";
import { ISection } from "./types";

const theme = createTheme({
  palette: {
    mode: "dark"
  }
});

function toNodes(levels: Record<string, ISection>, run = 1) {
  return Object.values(levels).flatMap((level, index) => {
    const [group] = level.path.split(".");
    if (level.steps) {
      return [
        {
          group,
          id: level.id,
          name: level.name,
          color: level.done ? "green" : level.started ? "orange" : "red"
        },
        ...toNodes(level.steps, run * index)
      ];
    }
    return {
      group,
      id: level.id,
      name: level.name,
      color: level.done ? "green" : level.started ? "orange" : "red"
    };
  });
}

function toLinks(levels: Record<string, ISection>) {
  return Object.values(levels).flatMap((level) => {
    if (level.steps) {
      return [
        ...level.dependencies.flatMap((dependency) => {
          return {
            target: level.id,
            source: dependency,
            linkWidth: 10
          };
        }),
        ...toLinks(level.steps)
      ];
    }
    return level.dependencies.flatMap((dependency) => {
      return {
        target: level.id,
        source: dependency
      };
    });
  });
}

function Graph({ nodes, links }) {
  const { scene } = useThree();
  const forceGraph = useMemo(() => new ThreeForceGraph(), []);

  useEffect(() => {
    while (scene.children.length > 0) {
      scene.remove(scene.children[0]);
    }
    scene.add(forceGraph);
    forceGraph.nodeThreeObject((node) => {
      const sprite = new SpriteText(node.name);
      sprite.color = node.color;
      sprite.textHeight = 4;
      return sprite;
    });
  }, [scene, forceGraph]);

  useEffect(() => {
    forceGraph.graphData({
      nodes,
      links
    });
  }, [forceGraph, nodes, links]);

  useFrame(() => {
    forceGraph.tickFrame();
  });

  useEffect(() => {
    function handleResize() {
      //forceGraph.width(ref.current.parentNode.offsetWidth);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [forceGraph]);

  return null; //<div ref={ref} style={{ position: "absolute", inset: 0 }} />;
}

export default function App() {
  const levels = useStore((state) => state.levels);
  const nodes = useMemo(() => toNodes(levels), [levels]);
  const links = useMemo(() => toLinks(levels), [levels]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container sx={{ my: 4 }}>
        <Box sx={{ height: "100vh", position: "relative" }}>
          <Canvas>
            <OrbitControls />
            <Graph nodes={nodes} links={links} />
          </Canvas>
        </Box>
      </Container>
      <Legend />
      <Sidebar />
    </ThemeProvider>
  );
}
