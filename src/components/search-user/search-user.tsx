import React, { useState } from "react";
import SearchBar from "./components/search-bar";
import { DataViewer } from "./components/data-viewer/data-viewer";
import { useOverview } from "../../api-hooks/use-overview";
import { useSettings } from "../../contexts/settings-provider";

export type SearchType = "userId" | "userEmail";
export const SEARCH_OPTIONS: SearchType[] = ["userEmail", "userId"];

const SearchUser: React.FC = () => {
  const { environmentConfig } = useSettings();
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("userEmail");

  const { loading, error, data } = useOverview({
    customerId: searchType === "userId" ? search : undefined,
    customerEmail: searchType === "userEmail" ? search : undefined,
    myUserEmail: environmentConfig.myUserEmail,
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
      {!loading && !error && data && (
        <DataViewer
          customerUserData={data.customerUserData}
          customerDocumentData={data.customerDocumentData}
        />
      )}
    </div>
  );
};

export default SearchUser;
