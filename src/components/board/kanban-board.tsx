import { Column } from "./column";
import { Card } from "@/components/board";

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
        headingColor="text-muted-foreground"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="TODO"
        column="todo"
        headingColor="text-warning"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="IN_PROGRESS"
        column="doing"
        headingColor="text-primary"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="DONE"
        column="done"
        headingColor="text-success"
        cards={cards}
        setCards={setCards}
      />
    </div>
  );
};
