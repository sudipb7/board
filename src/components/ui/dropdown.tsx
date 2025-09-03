import { useState, useRef, useEffect, ReactNode } from "react";

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: "left" | "right";
}

interface DropdownItemProps {
  onClick: () => void;
  children: ReactNode;
  variant?: "default" | "destructive";
}

export const Dropdown = ({
  trigger,
  children,
  align = "right",
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-1 hover:bg-muted"
      >
        {trigger}
      </button>

      {isOpen && (
        <div
          className={`absolute top-full mt-1 bg-background border py-1 z-50 min-w-[220px] ${
            align === "left" ? "left-0" : "right-0"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export const DropdownItem = ({
  onClick,
  children,
  variant = "default",
}: DropdownItemProps) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full text-left px-3 py-2 text-xs ${
        variant === "destructive"
          ? "text-destructive hover:bg-red-50 dark:hover:bg-red-950"
          : "hover:bg-muted text-foreground"
      }`}
    >
      {children}
    </button>
  );
};

export const DropdownSeparator = () => {
  return <div className="my-1 h-px bg-border" />;
};
