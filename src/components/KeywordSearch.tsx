import { Input } from "antd";
import { useState } from "react";
import { INITIAL_SEARCH_QUERY } from "../constants";

const { Search } = Input;

interface Props {
  onSearch: (keyword: string) => void;
}

export const KeywordSearch = ({ onSearch }: Props) => {
  const [searchInputValue, setSearchInputValue] =
    useState(INITIAL_SEARCH_QUERY);

  return (
    <Search
      value={searchInputValue}
      onChange={(event) => setSearchInputValue(event.currentTarget.value)}
      placeholder="search for term (ex: hooks)"
      onSearch={onSearch}
      style={{
        width: 300,
        marginBottom: 50,
        display: "block",
        margin: "0 auto 50px",
      }}
    />
  );
};
