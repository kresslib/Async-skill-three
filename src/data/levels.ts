import { setProperty } from "dot-prop";

import { InitSection, ISection } from "../types";

const levels: Record<string, ISection> = {};

export default levels;

function injectSteps(path: string) {
  return path.split(".").join(".steps.");
}

function addLevel(
  path: string,
  { name, required, dependencies = [] }: InitSection
) {
  //const parts = path.split(".");
  //parts.pop();//

  const path_ = injectSteps(path);
  const dependencies_ = dependencies.map((dependency) =>
    injectSteps(dependency)
  );
  //const parent = parts.length > 0 ? parts.join(".steps.") : undefined;

  setProperty(levels, path_, {
    name,
    required,
    //parent,
    id: injectSteps(path),
    started: false,
    done: false,
    dependencies: dependencies_,
    path: path_
  });
}

/**
 * HTML
 */
addLevel("html", {
  name: "HTML",
  required: true
});

/**
 * HTML Basics
 */

addLevel("html.basics", {
  name: "HTML Basics",
  required: true,
  dependencies: ["html"]
});

addLevel("html.basics.syntax", {
  name: "HTML Syntax",
  required: true,
  dependencies: ["html.basics"]
});

addLevel("html.basics.elements", {
  name: "HTML Elements",
  required: true,
  dependencies: ["html.basics.syntax"]
});

addLevel("html.basics.attributes", {
  name: "HTML Attributes",
  required: true,
  dependencies: ["html.basics.elements"]
});

addLevel("html.basics.documentStructure", {
  name: "HTML Document Structure",
  required: true,
  dependencies: ["html.basics.attributes"]
});

/**
 * HTML Forms
 */
addLevel("html.forms", {
  name: "HTML Forms",
  required: true,
  dependencies: ["html.basics.documentStructure"]
});

/**
 * HTML A11y
 * (Example for partially dependent steps)
 */

addLevel("html.a11y", {
  name: "HTML A11y",
  required: true,
  dependencies: ["html.basics.documentStructure"]
});

addLevel("html.a11y.ariaAttributes", {
  name: "HTML Aria",
  required: true,
  dependencies: ["html.a11y"]
});

addLevel("html.a11y.elements", {
  name: "HTML Elements",
  required: true,
  dependencies: ["html.a11y"]
});

addLevel("html.a11y.forms", {
  name: "HTML A11y Forms",
  required: true,
  dependencies: ["html.a11y", "html.forms"]
});

/**
 * CSS
 */
addLevel("css", {
  name: "CSS",
  required: true,
  dependencies: ["html.basics.documentStructure"]
});

/**
 * CSS Basics
 */
addLevel("css.basics", {
  name: "CSS Basics",
  required: true,
  dependencies: ["css"]
});

addLevel("css.basics.syntax", {
  name: "CSS Syntax",
  required: true,
  dependencies: ["css.basics"]
});

addLevel("css.basics.selectors", {
  name: "CSS Selectors",
  required: true,
  dependencies: ["css.basics.syntax"]
});

addLevel("css.basics.properties", {
  name: "CSS Properties",
  required: true,
  dependencies: ["css.basics.selectors"]
});

addLevel("css.basics.styleSheets", {
  name: "CSS Style Sheets",
  required: true,
  dependencies: ["css.basics.properties"]
});

addLevel("css.basics.boxModel", {
  name: "CSS Box model",
  required: true,
  dependencies: ["css.basics.styleSheets"]
});

addLevel("css.basics.inlineBlock", {
  name: "CSS Inline & Block",
  required: true,
  dependencies: ["css.basics.boxModel"]
});

/**
 * CSS Layout
 */

addLevel("css.layout", {
  name: "CSS Layout",
  required: true,
  dependencies: ["css.basics.inlineBlock"]
});

addLevel("css.layout.position", {
  name: "CSS Position",
  required: true,
  dependencies: ["css.layout"]
});

addLevel("css.layout.flexbox", {
  name: "CSS Flexbox",
  required: true,
  dependencies: ["css.layout"]
});

addLevel("css.layout.grid", {
  name: "CSS Grid",
  required: true,
  dependencies: ["css.layout"]
});

/**
 * CSS Structure
 */

addLevel("css.structure", {
  name: "CSS Structure",
  required: true,
  dependencies: ["css.layout.grid", "css.layout.flexbox", "css.layout.position"]
});

addLevel("css.structure.files", {
  name: "CSS Files",
  required: true,
  dependencies: ["css.structure"]
});

addLevel("css.structure.components", {
  name: "CSS Components",
  required: true,
  dependencies: ["css.structure"]
});
addLevel("css.structure.variables", {
  name: "CSS Variables",
  required: true,
  dependencies: ["css.structure"]
});

/**
 * CSS Responsive
 * (Example for partially required)
 */

addLevel("css.responsive", {
  name: "CSS Responsive",
  required: true,
  dependencies: [
    "css.structure.variables",
    "css.structure.components",
    "css.structure.files"
  ]
});

addLevel("css.responsive.mediaQueries1", {
  name: "CSS Mediaqueries 1",
  required: true,
  dependencies: ["css.responsive"]
});

addLevel("css.responsive.mediaQueries2", {
  name: "CSS Mediaqueries 2",
  dependencies: ["css.responsive.mediaQueries1"]
});

/**
 * CSS Animations
 * (Example for not required)
 */

addLevel("css.animations", {
  name: "CSS Animations",
  dependencies: [
    "css.structure.variables",
    "css.structure.components",
    "css.structure.files"
  ]
});

/**
 * JS
 */

addLevel("js", {
  name: "JavaScript",
  required: true,
  dependencies: ["css.basics.inlineBlock"]
});

/**
 * JS Basics
 */

addLevel("js.basics", {
  name: "JavaScript Basics",
  required: true,
  dependencies: ["js"]
});

addLevel("js.basics.syntax", {
  name: "JavaScript Syntax",
  required: true,
  dependencies: ["js.basics"]
});

addLevel("js.basics.nativeUtils", {
  name: "JavaScript Native Utils",
  required: true,
  dependencies: ["js.basics.syntax"]
});

/**
 * React
 */

addLevel("react", {
  name: "React",
  required: true,
  dependencies: ["js.basics.nativeUtils"]
});

/**
 * React Basics
 */

addLevel("react.basics", {
  name: "React Basics",
  required: true,
  dependencies: ["react"]
});

addLevel("react.basics.syntax", {
  name: "React Syntax",
  required: true,
  dependencies: ["react.basics"]
});
