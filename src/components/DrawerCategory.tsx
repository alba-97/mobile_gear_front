import { Menu, MenuButton } from "@chakra-ui/react";

interface IDrawerCategoryProps {
  onClick: () => void;
  text: string;
}

const DrawerCategory = ({ onClick, text }: IDrawerCategoryProps) => {
  return (
    <Menu>
      <MenuButton fontSize="lg" color="black" padding={3} onClick={onClick}>
        {text}
      </MenuButton>
    </Menu>
  );
};

export default DrawerCategory;
