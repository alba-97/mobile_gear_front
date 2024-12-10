import { SearchIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import SearchInput from "./SearchInput";

interface ISearchProps {
  value: string;
  onChange: (
    value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const Search = ({ value, onChange, handleSubmit }: ISearchProps) => {
  return (
    <Box mr={10}>
      <form onSubmit={handleSubmit}>
        <Flex marginLeft={2}>
          <SearchInput value={value} onChange={onChange} />
          <IconButton
            type="submit"
            aria-label="Search"
            icon={<SearchIcon />}
            backgroundColor="#3498DB"
            _hover={{ bg: "#026bb0" }}
            color="white"
            borderRadius={"lg"}
            ml={2}
          />
        </Flex>
      </form>
    </Box>
  );
};

export default Search;
