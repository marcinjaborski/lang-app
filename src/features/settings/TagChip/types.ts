import { TagToCreate } from "@src/types";

export type TagChipProps = {
  tag: TagToCreate;
  onDelete: (tag: TagToCreate) => void;
  onColorChange: (tag: TagToCreate, color: string) => void;
};
