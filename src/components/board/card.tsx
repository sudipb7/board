import { DragEvent } from "react";
import type { Card as CardType } from ".";
import { DropIndicator } from "./drop-indicator";

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
        className="cursor-grab border border-[#d1d9e0] bg-[#f6f8fa] p-4 mb-3 hover:bg-[#ffffff] hover:border-[#0969da] active:cursor-grabbing"
      >
        <p className="text-sm text-[#24292f] font-mono">{title}</p>
      </div>
    </>
  );
};
