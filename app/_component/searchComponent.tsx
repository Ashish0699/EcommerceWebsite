import { Input } from "antd";
import React from "react";
import { useCallback } from "react";
import debounce from "lodash/debounce";

interface SearchComponentProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchComponent = (props: SearchComponentProps) => {
  const { searchTerm, setSearchTerm } = props;

  const debouncedSearch = useCallback((value: string) => {
    debounce((val) => setSearchTerm(val), 500)(value);
  }, [setSearchTerm]);
  

  return (
    <Input
      type="search"
      placeholder="Search products..."
      defaultValue={searchTerm}
      onChange={(e) => debouncedSearch(e.target.value)}
      className="max-w-sm"
    />
  );
};

export default SearchComponent;
