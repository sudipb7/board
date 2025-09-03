import { useState, DragEvent } from "react";
import { FiMoreVertical } from "react-icons/fi";

import { Card } from "./card";
import { AddCard } from "./add-card";
import { DropIndicator } from "./drop-indicator";
import {
  Dropdown,
  DropdownItem,
  DropdownSeparator,
} from "@/components/ui/dropdown";
import { ConfirmDialog } from "@/components/ui/dialog";
import type { Card as CardType } from "@/components/board";

interface ColumnProps {
  title: string;
  column: string;
  headingColor: string;
  cards: CardType[];
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
}

export const Column = ({
  title,
  headingColor,
  cards,
  column,
  setCards,
}: ColumnProps) => {
  const [active, setActive] = useState(false);
  const [showClearDialog, setShowClearDialog] = useState(false);

  const handleDragStart = (e: DragEvent<HTMLDivElement>, card: CardType) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    // @ts-expect-error - data-before is a custom attribute
    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els?: Element[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      (i as HTMLElement).style.opacity = "0";
    });
  };

  const highlightIndicator = (e: DragEvent<HTMLDivElement>) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    (el.element as HTMLElement).style.opacity = "1";
  };

  const getNearestIndicator = (
    e: DragEvent<HTMLDivElement>,
    indicators: Element[],
  ) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      },
    );

    return el;
  };

  const getIndicators = (): Element[] => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column);

  const handleMoveAllTo = (targetColumn: string) => {
    setCards((pv) =>
      pv.map((c) => (c.column === column ? { ...c, column: targetColumn } : c)),
    );
  };

  const getColumnTitle = (col: string) => {
    switch (col) {
      case "backlog":
        return "BACKLOG";
      case "todo":
        return "TODO";
      case "doing":
        return "IN PROGRESS";
      case "done":
        return "DONE";
      default:
        return col.toUpperCase();
    }
  };

  const getColumnColor = (col: string) => {
    switch (col) {
      case "backlog":
        return "text-muted-foreground";
      case "todo":
        return "text-warning";
      case "doing":
        return "text-success";
      case "done":
        return "text-primary";
      default:
        return "text-muted-foreground";
    }
  };

  const otherColumns = ["backlog", "todo", "doing", "done"].filter(
    (c) => c !== column,
  );

  return (
    <div className="w-72 shrink-0">
      <div className="mb-1 flex items-center justify-between pb-3 border-b">
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground text-xs">//</span>
          <h3
            className={`font-medium text-xs uppercase ${headingColor}`}
          >
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-muted px-3 py-1 text-xs text-muted-foreground font-medium border">
            {filteredCards.length}
          </span>
          {filteredCards.length > 0 && (
            <Dropdown
              trigger={
                <FiMoreVertical className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
              }
            >
              {otherColumns.map((targetColumn) => (
                <DropdownItem
                  key={targetColumn}
                  onClick={() => handleMoveAllTo(targetColumn)}
                >
                  <div className="text-muted-foreground">
                    // Move all to{" "}
                    <span className={getColumnColor(targetColumn)}>
                      {getColumnTitle(targetColumn)}
                    </span>
                  </div>
                </DropdownItem>
              ))}
              <DropdownSeparator />
              <DropdownItem
                onClick={() => setShowClearDialog(true)}
                variant="destructive"
              >
                <span>// Clear column</span>
              </DropdownItem>
            </Dropdown>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={showClearDialog}
        onClose={() => setShowClearDialog(false)}
        onConfirm={() =>
          setCards((pv) => pv.filter((c) => c.column !== column))
        }
        title="Clear Column"
        description={`Are you sure you want to clear all cards from ${title}?`}
        confirmText="Clear"
        cancelText="Cancel"
        variant="destructive"
      />
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`w-full h-full py-2 ${
          active
            ? "bg-blue-50 dark:bg-blue-950 border border-primary"
            : "bg-transparent"
        }`}
      >
        {filteredCards.map((c) => (
          <Card key={c.id} {...c} handleDragStart={handleDragStart} />
        ))}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};
