import React from "react";
import { Search } from "lucide-react"; // Import the Search icon
import style from "./searchQuery.module.css";

function SearchQuery({
  setQuery,
  setData,
  setCurrentPage,
  query,
  searchKey,
  fetchedData,
}) {
  const handleSearch = (event) => {
    const value = event.target.value;
    setQuery(value);

    if (!value) {
      setData(fetchedData);
      return;
    }

    const filteredData = fetchedData.filter((item) =>
      searchKey.some((key) =>
        item[key]?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setData(filteredData);
    setCurrentPage(1);
  };

  return (
    <div className={style.searchBar}>
      <Search className={style.searchIcon} />
      <input
        onChange={handleSearch}
        type="text"
        placeholder="Search"
        value={query}
        aria-label="Search query"
      />
    </div>
  );
}

export default SearchQuery;
