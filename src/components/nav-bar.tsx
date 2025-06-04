import { Settings } from "lucide-react";
import React from "react";
import { useSettings, type Environment } from "../contexts/settings-provider";
import { GenericToggle } from "../ui/mode-toggle";
import { Button } from "../ui/shadcn-primitives/button";
import { ThemeToggle } from "../ui/theme-toggle";
import SettingsDialog from "../dialogs/settings-dialog";

const ENVIRONMENT_OPTIONS: Environment[] = ["local", "staging", "production"];

const Navbar: React.FC = () => {
  const { environment, setEnvironment } = useSettings();

  return (
    <header className="navbar w-full flex justify-between items-center border-b border-border p-4">
      <div className="flex items-center gap-4">
        <p className="text-sm font-medium pr-2">Workflow</p>
        <p className="text-muted-foreground text-sm">/</p>
        <GenericToggle
          options={ENVIRONMENT_OPTIONS}
          value={environment}
          onChange={setEnvironment}
          variant="ghost"
        />
      </div>
      <div className="flex items-center gap-1">
        <SettingsDialog
          trigger={
            <Button variant="ghost" size="icon">
              <Settings className="w-2 h-2" />
            </Button>
          }
        />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Navbar;
