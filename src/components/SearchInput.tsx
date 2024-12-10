import { Input } from "@chakra-ui/react";
import React from "react";

interface ISearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ value, onChange }: ISearchInputProps) => {
  const styles = {
    boxShadow: "none",
    border: "1px solid #ccc",
  };

  return (
    <Input
      placeholder="Search..."
      backgroundColor="white"
      color="black"
      value={value}
      onChange={onChange}
      {...styles}
      _active={styles}
      _focus={styles}
      _hover={styles}
    />
  );
};

export default SearchInput;
