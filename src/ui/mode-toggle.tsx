import { ChevronDown } from "lucide-react";

import { Button } from "./shadcn-primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./shadcn-primitives/dropdown-menu";

interface ToggleProps<T extends string> {
  options: T[];
  value: T;
  onChange: (value: T) => void;
  variant?: "outline" | "ghost" | "default";
}

export function GenericToggle<T extends string>({
  options,
  value,
  onChange,
  variant = "outline",
}: ToggleProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant}>
          <span className="text-sm">{value}</span>
          <ChevronDown className="!w-3 !h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map((option) => (
          <DropdownMenuItem key={option} onClick={() => onChange(option)}>
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
