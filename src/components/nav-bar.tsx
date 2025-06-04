import { Settings } from "lucide-react";
import React, { useState } from "react";
import { ModeToggle } from "../ui/mode-toggle";
import { Button } from "../ui/shadcn-primitives/button";
import { ThemeToggle } from "../ui/theme-toggle";

const Navbar: React.FC = () => {
  const [mode, setMode] = useState("local");

  return (
    <header className="navbar w-full flex justify-between items-center border-b border-border p-4">
      <div className="flex items-center gap-4">
        <p className="text-md font-semibold">Workflow</p>
        <p className="text-muted-foreground text-sm">/</p>
        <ModeToggle
          options={["local", "staging", "production"]}
          value={mode}
          onChange={setMode}
        />
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon">
          <Settings className="w-2 h-2" />
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Navbar;
