import { FiTrash } from "react-icons/fi";
import { useState, DragEvent, useMemo } from "react";
import { FaGithub, FaTwitter, FaMoon, FaSun } from "react-icons/fa";

import { useTheme } from "@/hooks/useTheme";
import type { Card } from "@/components/board";

interface DeleteAreaProps {
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
  onShowLanding?: () => void;
}

export const DeleteArea = ({
  cards,
  setCards,
  onShowLanding,
}: DeleteAreaProps) => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState<boolean>(false);

  const ThemeIcon = useMemo(() => {
    return theme === "dark" ? FaMoon : FaSun;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleClearAll = () => {
    if (cards.length === 0) return;

    const confirmed = window.confirm(
      "Are you sure you want to clear all cards? This action cannot be undone.",
    );
    if (confirmed) {
      setCards([]);
    }
  };

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
          ? "border-b-2 border-destructive bg-red-50 dark:bg-red-950"
          : "border-b"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h1
            onClick={onShowLanding}
            className="text-xl font-bold text-primary tracking-tight mb-1 cursor-pointer"
          >
            board.sudipbiswas.dev
          </h1>
          <p className="text-sm text-muted-foreground">
            // Managing tasks should be easy and intuitive
          </p>
        </div>
        <div className="flex items-center gap-4">
          {!active && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 text-xs text-destructive"
                title="Clear all cards"
              >
                <FiTrash className="h-3.5 w-3.5" />
                <span>clear all</span>
              </button>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 text-xs text-muted-foreground"
                title="Switch theme"
              >
                <ThemeIcon className="h-3.5 w-3.5" />
                <span>theme</span>
              </button>
              <a
                href="https://x.com/sudipcodes"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <FaTwitter className="h-3.5 w-3.5" />
                <span>twitter</span>
              </a>
              <a
                href="https://github.com/sudipb7/board"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <FaGithub className="h-3.5 w-3.5" />
                <span>github</span>
              </a>
            </div>
          )}
          {active && (
            <div className="flex items-center gap-3 text-destructive text-sm">
              <FiTrash className="text-base" />
              <span>Drop to delete</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
