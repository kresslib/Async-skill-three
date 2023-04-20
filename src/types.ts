import { Except, SetOptional } from "type-fest";

export interface ISection {
  id: string;
  name: string;
  started: boolean;
  done: boolean;
  required?: boolean;
  path: string;
  dependencies: string[];
  steps?: Record<string, ISection>;
  //parent?: string;
}

export type MutableSectionProps = "started" | "done";

export type MutableLevels = Partial<Pick<ISection, MutableSectionProps>>;

export interface StoreModel {
  levels: Record<string, ISection>;
  legendOpen: boolean;
  drawerOpen: boolean;
  update(path: string, partial: MutableLevels): void;
  set(partial: Except<Partial<StoreModel>, "update" | "set">): void;
}

export interface LevelProps {
  step: ISection;
  isAvailable: boolean;
}

export interface SectionProps {
  steps: Record<string, ISection>;
  isAvailable?: boolean;
}
export type ISectionInitProps = "name" | "required" | "dependencies";
export type InitSection = Pick<
  SetOptional<ISection, "dependencies">,
  ISectionInitProps
>;
