import { Card } from ".";
import { Column } from "./column";

interface KanbanBoardProps {
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

export const KanbanBoard = ({ cards, setCards }: KanbanBoardProps) => {
  return (
    <div className="flex-1 flex h-full w-full gap-6 overflow-x-auto pb-4">
      <Column
        title="BACKLOG"
        column="backlog"
        headingColor="text-[#656d76]"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="TODO"
        column="todo"
        headingColor="text-[#bf8700]"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="IN_PROGRESS"
        column="doing"
        headingColor="text-[#0969da]"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="DONE"
        column="done"
        headingColor="text-[#1a7f37]"
        cards={cards}
        setCards={setCards}
      />
    </div>
  );
};
