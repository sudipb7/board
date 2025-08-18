import { useState, useEffect } from "react";
import { DEFAULT_CARDS } from "../../lib/constants";
import { DeleteArea } from "./delete-area";
import { KanbanBoard } from "./kanban-board";

export interface Card {
  id: string;
  title: string;
  column: string;
}

export const Board = () => {
  const localCards = localStorage.getItem("cards");
  const [cards, setCards] = useState<Card[]>(
    localCards ? JSON.parse(localCards) : DEFAULT_CARDS,
  );

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  const handleShowLanding = () => {
    try {
      localStorage.removeItem("board-landing-page-visited");
      window.location.reload();
    } catch (error) {
      console.warn("Failed to reset landing page state:", error);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full p-6 w-full bg-[#ffffff] text-[#24292f] font-mono overflow-hidden">
      <DeleteArea setCards={setCards} onShowLanding={handleShowLanding} />
      <KanbanBoard cards={cards} setCards={setCards} />
    </div>
  );
};
