import { FiPlus } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";

import { Card } from "@/components/board";

interface AddCardProps {
  column: string;
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

export const AddCard = ({ column, setCards }: AddCardProps) => {
  const formRef = useRef<HTMLFormElement>(null);
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

  useEffect(() => {
    if (adding) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [adding]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setAdding(false);
    }
    if (e.key === "Enter" && !e.shiftKey) {
      formRef.current?.requestSubmit();
    }
  };

  return (
    <>
      {adding ? (
        <form onSubmit={handleSubmit} ref={formRef}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="// Add new task..."
            className="w-full border bg-background p-4 text-sm placeholder-muted-foreground focus:outline-0 focus:border-primary resize-none leading-relaxed"
            rows={3}
          />
          <div className="mt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setAdding(false)}
              className="px-4 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              // Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-success px-4 py-2 text-xs text-white hover:brightness-95 font-medium"
            >
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted border border-dashed hover:border-primary group"
        >
          <FiPlus />
          <span>// Add new task</span>
        </button>
      )}
    </>
  );
};
