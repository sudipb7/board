import { FiPlus } from "react-icons/fi";
import { Card } from ".";
import { useState, useRef, useEffect } from "react";

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
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
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
