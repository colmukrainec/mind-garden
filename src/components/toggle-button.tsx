import React from "react";

interface ToggleButtonProps {
  value: string | number;
  isSelected: boolean;
  onChange: (value: string | number) => void;
  children: React.ReactNode;
}

const ToggleButton: React.FC<ToggleButtonProps> = React.memo(
  ({ value, isSelected, onChange, children }) => (
    <button
      className={`
        px-3 py-2 rounded-md text-sm font-medium transition-colors
        ${isSelected
        ? "bg-white/40 text-green-900 hover:bg-white/50"
        : "bg-transparent hover:bg-white/30 text-gray-700"
      }
      `}
      onClick={() => onChange(value)}
    >
      {children}
    </button>
  )
);

ToggleButton.displayName = "ToggleButton";

export default ToggleButton;
