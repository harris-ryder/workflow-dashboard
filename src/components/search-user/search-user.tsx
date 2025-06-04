import React from "react";
import SearchBar from "./components/search-bar";
import { DataViewer } from "./components/data-viewer/data-viewer";

const SearchUser: React.FC = () => {
  return (
    <div>
      <SearchBar />
      <DataViewer />
    </div>
  );
};

export default SearchUser;
