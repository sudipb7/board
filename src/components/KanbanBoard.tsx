import React, { useState, DragEvent, useEffect } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";

interface Card {
  id: string;
  title: string;
  column: string;
}

interface ColumnProps {
  title: string;
  column: string;
  headingColor: string;
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

interface CardProps extends Card {
  handleDragStart: (e: DragEvent<HTMLDivElement>, card: Card) => void;
}

interface DropIndicatorProps {
  beforeId: string | null;
  column: string;
}

interface AddCardProps {
  column: string;
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

interface DeleteAreaProps {
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

const KanbanBoard: React.FC = () => {
  const localCards = localStorage.getItem("cards");
  const [cards, setCards] = useState<Card[]>(
    localCards ? JSON.parse(localCards) : DEFAULT_CARDS,
  );

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  return (
    <div className="h-screen w-full bg-[#ffffff] text-[#24292f] font-mono overflow-hidden">
      <div className="h-full w-full p-6">
        <DeleteArea setCards={setCards} />
        <Board cards={cards} setCards={setCards} />
      </div>
    </div>
  );
};

interface BoardProps {
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

const Board: React.FC<BoardProps> = ({ cards, setCards }) => {
  return (
    <div className="flex h-full w-full gap-6 overflow-x-auto pb-4">
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

const Column: React.FC<ColumnProps> = ({
  title,
  headingColor,
  cards,
  column,
  setCards,
}) => {
  const [active, setActive] = useState<boolean>(false);

  const handleDragStart = (e: DragEvent<HTMLDivElement>, card: Card) => {
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

  return (
    <div className="w-72 shrink-0">
      <div className="mb-4 flex items-center justify-between pb-3 border-b border-[#d1d9e0]">
        <div className="flex items-center gap-3">
          <span className="text-[#656d76] font-mono text-xs">//</span>
          <h3
            className={`font-medium text-xs uppercase tracking-wider ${headingColor}`}
          >
            {title}
          </h3>
        </div>
        <span className="bg-[#f6f8fa] px-3 py-1 text-xs text-[#656d76] font-medium border border-[#d1d9e0]">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full py-2 ${
          active ? "bg-[#dbeafe] border border-[#0969da]" : "bg-transparent"
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

const Card: React.FC<CardProps> = ({ title, id, column, handleDragStart }) => {
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

const DropIndicator: React.FC<DropIndicatorProps> = ({ beforeId, column }) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-[#0969da] opacity-0"
    />
  );
};

const DeleteArea: React.FC<DeleteAreaProps> = ({ setCards }) => {
  const [active, setActive] = useState<boolean>(false);
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData("cardId");
    if (cardId) {
      setCards((pv) => pv.filter((c) => c.id !== cardId));
    }
    setActive(false);
  };

  return (
    <header
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mb-6 pb-4 ${
        active
          ? "border-b-2 border-[#da3633] bg-[#ffebe9]"
          : "border-b border-[#d1d9e0]"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0969da] tracking-tight mb-1">
            kanban.board
          </h1>
          <p className="text-sm text-[#656d76]">
            // Project management interface
          </p>
        </div>
        {active && (
          <div className="flex items-center gap-3 text-[#da3633] text-sm">
            <FiTrash className="text-base" />
            <span className="font-mono">Drop to delete</span>
          </div>
        )}
      </div>
    </header>
  );
};

const AddCard: React.FC<AddCardProps> = ({ column, setCards }) => {
  const [text, setText] = useState<string>("");
  const [adding, setAdding] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCard: Card = {
      column,
      title: text.trim(),
      id: Math.random().toString(),
    };

    setCards((pv) => [...pv, newCard]);

    setAdding(false);
    setText("");
  };

  return (
    <>
      {adding ? (
        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="// Add new task..."
            className="w-full border border-[#d1d9e0] bg-[#ffffff] p-4 text-sm text-[#24292f] placeholder-[#656d76] focus:outline-0 focus:border-[#0969da] resize-none font-mono leading-relaxed"
            rows={3}
          />
          <div className="mt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setAdding(false)}
              className="px-4 py-2 text-xs text-[#656d76] hover:text-[#24292f] hover:bg-[#f6f8fa] font-mono"
            >
              // Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#1f883d] px-4 py-2 text-xs text-white hover:bg-[#1a7f37] font-medium"
            >
              <span>Add</span>
              <FiPlus className="text-xs" />
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-3 px-4 py-3 text-sm text-[#656d76] hover:text-[#24292f] hover:bg-[#f6f8fa] border border-dashed border-[#d1d9e0] hover:border-[#0969da] group"
        >
          <FiPlus className="text-base group-hover:text-[#0969da]" />
          <span className="font-mono">// Add new task</span>
        </button>
      )}
    </>
  );
};

const DEFAULT_CARDS: Card[] = [
  // BACKLOG
  { title: "Look into render bug in dashboard", id: "1", column: "backlog" },
  { title: "SOX compliance checklist", id: "2", column: "backlog" },
  { title: "[SPIKE] Migrate to Azure", id: "3", column: "backlog" },
  { title: "Document Notifications service", id: "4", column: "backlog" },
  // TODO
  {
    title: "Research DB options for new microservice",
    id: "5",
    column: "todo",
  },
  { title: "Postmortem for outage", id: "6", column: "todo" },
  { title: "Sync with product on Q3 roadmap", id: "7", column: "todo" },

  // DOING
  {
    title: "Refactor context providers to use Zustand",
    id: "8",
    column: "doing",
  },
  { title: "Add logging to daily CRON", id: "9", column: "doing" },
  // DONE
  {
    title: "Set up DD dashboards for Lambda listener",
    id: "10",
    column: "done",
  },
];

export default KanbanBoard;
