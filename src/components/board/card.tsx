import { DragEvent } from "react";

import { DropIndicator } from "./drop-indicator";
import type { Card as CardType } from "@/components/board";

interface CardProps extends CardType {
  handleDragStart: (e: DragEvent<HTMLDivElement>, card: CardType) => void;
}

export const Card = ({ title, id, column, handleDragStart }: CardProps) => {
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
