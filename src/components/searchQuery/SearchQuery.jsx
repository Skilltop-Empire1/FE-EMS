import React from "react";

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
    <input
      onChange={handleSearch}
      type="text"
      placeholder="Enter name to search"
      value={query}
      aria-label="Search query"
    />
  );
}

export default SearchQuery;
