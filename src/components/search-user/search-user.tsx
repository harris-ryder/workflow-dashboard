import React, { useState } from "react";
import SearchBar from "./components/search-bar";
import { DataViewer } from "./components/data-viewer/data-viewer";
import { useOverview } from "../../api-hooks/use-overview";

export type SearchType = "userId" | "userEmail";
export const SEARCH_OPTIONS: SearchType[] = ["userEmail", "userId"];

const SearchUser: React.FC = () => {
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("userEmail");

  const { loading, error, data } = useOverview({
    userId: searchType === "userId" ? search : undefined,
    email: searchType === "userEmail" ? search : undefined,
  });

  return (
    <div className="px-4">
      <SearchBar
        search={search}
        searchType={searchType}
        submitSearch={(submittedSearch, submittedSearchType) => {
          setSearch(submittedSearch);
          setSearchType(submittedSearchType);
        }}
      />
      {loading && <div>Loading...</div>}
      {!loading && error && <div>Error: {error.message}</div>}
      {!loading && !error && data && <DataViewer data={data} />}
    </div>
  );
};

export default SearchUser;
