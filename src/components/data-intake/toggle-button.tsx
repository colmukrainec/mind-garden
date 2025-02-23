import React, {JSX, ReactNode} from 'react';

interface ToggleButtonProps<T extends string | number> {
  value: T;
  isSelected: boolean;
  onChange: (value: T) => void;
  children: React.ReactNode;
  disabled?: boolean;
}

function ToggleButton<T extends string | number>({
  value,
  isSelected,
  onChange,
  children,
  disabled,
}: ToggleButtonProps<T>) {
  return (
    <button
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
      ${
        isSelected
          ? 'bg-white/40 text-green-900 hover:bg-white/50'
          : 'bg-transparent hover:bg-white/30 text-gray-700'
      }
    `}
      onClick={() => onChange(value)}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

// Wrap the component AFTER defining it
export default React.memo(ToggleButton) as <T extends string | number>(
  props: ToggleButtonProps<T>,
) => ReactNode;
