import { useRef } from "react";
import {
  Box,
  Flex,
  IconButton,
  useDisclosure,
  PopoverTrigger,
  Popover,
  PopoverContent,
  PopoverArrow,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import SearchInput from "./SearchInput";

interface IDropdownSearchProps {
  value: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const DropdownSearch = ({
  value,
  onChange,
  handleSubmit,
}: IDropdownSearchProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <Box mr={10}>
      <Popover
        isOpen={isOpen}
        initialFocusRef={btnRef}
        onOpen={onOpen}
        onClose={onClose}
        placement="bottom-start"
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <IconButton
            ref={btnRef}
            aria-label="Search"
            icon={<SearchIcon />}
            size="lg"
            backgroundColor="transparent"
            _hover={{ bg: "transparent" }}
            color="white"
            borderRadius="full"
          />
        </PopoverTrigger>
        <PopoverContent p={5}>
          <PopoverArrow />
          <form onSubmit={handleSubmit}>
            <Flex>
              <SearchInput value={value} onChange={onChange} />
            </Flex>
          </form>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default DropdownSearch;
