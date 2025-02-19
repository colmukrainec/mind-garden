import React from "react";

interface ToggleButtonProps<T extends string | number> {
  value: T;
  isSelected: boolean;
  onChange: (value: T) => void;
  children: React.ReactNode;
}

const ToggleButton = React.memo(<T extends string | number>({
  value,
  isSelected,
  onChange,
  children
}: ToggleButtonProps<T>) => (
  <button
    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
      ${isSelected ? "bg-white/40 text-green-900 hover:bg-white/50"
      : "bg-transparent hover:bg-white/30 text-gray-700"}
    `}
    onClick={() => onChange(value)}
  >
    {children}
  </button>
));

ToggleButton.displayName = "ToggleButton";

export default ToggleButton;
