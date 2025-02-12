import { Menu, MenuButton } from "@chakra-ui/react";

interface INavbarCategoryProps {
  onClick: () => void;
  text: string;
}

const NavbarCategory = ({ onClick, text }: INavbarCategoryProps) => {
  return (
    <Menu>
      <MenuButton
        fontSize="lg"
        color="white"
        _hover={{
          bg: "#a62b07",
        }}
        borderRadius={"md"}
        padding={3}
        onClick={onClick}
      >
        {text}
      </MenuButton>
    </Menu>
  );
};

export default NavbarCategory;
