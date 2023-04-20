import { getProperty } from "dot-prop";
import produce from "immer";
import create from "zustand";

import { ISection, MutableLevels, StoreModel } from "../types";
import levels from "../data/levels";

function resolveParent(levels: Record<string, ISection>, parent_: string) {
  const parent = getProperty(levels, parent_);
  if (parent) {
    const isDone = Object.entries(parent.steps).every(([, step]) => {
      return !step.required || step.done;
    });
    const isStarted = Object.entries(parent.steps).some(([, step]) => {
      return step.started;
    });
    parent.done = isDone;
    parent.started = isStarted;
    if (parent.parent) {
      resolveParent(levels, parent.parent);
    }
  }
}

function handleUpdateLevels(
  levels: Record<string, ISection>,
  path: string,
  partial: MutableLevels
) {
  const section = getProperty(levels, path);
  if (section) {
    for (const key in partial) {
      section[key] = partial[key];
    }
    //if (section.parent) {
    //  resolveParent(levels, section.parent);
    //}
  }
}

const useStore = create<StoreModel>((set) => ({
  levels,
  legendOpen: false,
  drawerOpen: false,
  set(partial) {
    set(partial);
  },
  update(path, partial) {
    return set(
      produce<StoreModel>((draft) => {
        handleUpdateLevels(draft.levels, path, partial);
      })
    );
  }
}));

export default useStore;
