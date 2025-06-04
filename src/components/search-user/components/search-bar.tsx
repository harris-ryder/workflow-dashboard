import React, { useState } from "react";
import { GenericToggle } from "../../../ui/mode-toggle";
import { Button } from "../../../ui/shadcn-primitives/button";
import { Input } from "../../../ui/shadcn-primitives/input";
import { CornerDownLeft } from "lucide-react";

const SearchBar: React.FC = () => {
  const [mode, setMode] = useState("User ID");
  return (
    <div className="navbar w-full flex justify-start p-4 items-center gap-2">
      <GenericToggle
        options={["User ID", "User Email"]}
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
