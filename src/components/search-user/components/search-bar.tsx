import React, { useState } from "react";
import { GenericToggle } from "../../../ui/mode-toggle";
import { Button } from "../../../ui/shadcn-primitives/button";
import { Input } from "../../../ui/shadcn-primitives/input";
import { CornerDownLeft } from "lucide-react";
import { SEARCH_OPTIONS, type SearchType } from "../search-user";

const SearchBar: React.FC<{
  search: string;
  searchType: SearchType;
  submitSearch: (search: string, searchType: SearchType) => void;
}> = ({ search, searchType, submitSearch }) => {
  const [mode, setMode] = useState<SearchType>(searchType);
  const [searchValue, setSearchValue] = useState<string>(search);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    submitSearch(searchValue, mode);
  };

  return (
    <div className="navbar w-full flex justify-start py-4 items-center gap-2">
      <GenericToggle
        options={SEARCH_OPTIONS}
        value={mode}
        onChange={(value) => setMode(value)}
      />
      <form onSubmit={handleSubmit} className="flex gap-2 w-full">
        <Input
          placeholder="Search"
          className="max-w-md"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button variant="secondary" size="icon" type="submit">
          <CornerDownLeft className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
