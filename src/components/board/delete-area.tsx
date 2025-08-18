import { FiHome, FiTrash } from "react-icons/fi";
import type { Card } from ".";
import { useState, DragEvent } from "react";
import { FaGithub, FaTwitter } from "react-icons/fa";

interface DeleteAreaProps {
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
  onShowLanding?: () => void;
}

export const DeleteArea = ({ setCards, onShowLanding }: DeleteAreaProps) => {
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
          <h1
            onClick={onShowLanding}
            className="text-xl font-bold text-[#0969da] tracking-tight mb-1 cursor-pointer"
          >
            board.sudipbiswas.dev
          </h1>
          <p className="text-sm text-[#656d76]">
            // Managing tasks should be easy and intuitive
          </p>
        </div>
        <div className="flex items-center gap-4">
          {!active && (
            <div className="flex items-center gap-3">
              <button
                onClick={onShowLanding}
                className="flex items-center gap-2 text-xs text-[#656d76] hover:text-[#0969da] font-mono"
                title="View landing page"
              >
                <FiHome className="text-sm" />
                <span>home</span>
              </button>
              <a
                href="https://x.com/sudipcodes"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-[#656d76] hover:text-[#0969da] font-mono"
              >
                <FaTwitter className="text-sm" />
                <span>twitter</span>
              </a>
              <a
                href="https://github.com/sudipb7/board"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-[#656d76] hover:text-[#0969da] font-mono"
              >
                <FaGithub className="text-sm" />
                <span>github</span>
              </a>
            </div>
          )}
          {active && (
            <div className="flex items-center gap-3 text-[#da3633] text-sm">
              <FiTrash className="text-base" />
              <span className="font-mono">Drop to delete</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};