import React from "react";

interface ToggleButtonProps {
  value: string;
  isSelected: boolean;
  onChange: (value: string) => void;
  children: React.ReactNode;
}

const ToggleButton: React.FC<ToggleButtonProps> = React.memo(
  ({ value, isSelected, onChange, children }) => (
    <button
      className={`
        px-3 py-2 rounded-md text-sm font-medium transition-colors
        ${isSelected
        ? "bg-green-100 text-green-900 hover:bg-green-200"
        : "bg-transparent hover:bg-gray-100 text-gray-700"
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
