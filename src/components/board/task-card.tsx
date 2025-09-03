import { DragEvent } from "react";

import type { Task } from "@/hooks/useTasks";
import { DropIndicator } from "./drop-indicator";

interface TaskCardProps extends Task {
  handleDragStart: (e: DragEvent<HTMLDivElement>, card: Task) => void;
}

export const TaskCard = ({ title, id, column, handleDragStart }: TaskCardProps) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <div
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className="cursor-grab border bg-muted p-4 mb-3 hover:bg-background hover:border-primary active:cursor-grabbing"
      >
        <p className="text-sm">{title}</p>
      </div>
    </>
  );
};
