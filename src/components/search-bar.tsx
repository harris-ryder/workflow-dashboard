import React, { useState } from "react";
import { ModeToggle } from "../ui/mode-toggle";
import { Button } from "../ui/shadcn-primitives/button";
import { Input } from "../ui/shadcn-primitives/input";
import { CornerDownLeft } from "lucide-react";

const SearchBar: React.FC = () => {
  const [mode, setMode] = useState("User ID");
  return (
    <div className="navbar w-full flex justify-start items-center p-4 gap-2">
      <ModeToggle
        options={["User ID", "User Email", "Account ID"]}
        value={mode}
        onChange={setMode}
      />
      <Input placeholder="Search" className="max-w-md" />
      <Button variant="secondary" size="icon">
        <CornerDownLeft className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default SearchBar;
