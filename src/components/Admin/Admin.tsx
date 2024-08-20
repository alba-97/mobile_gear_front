import { useState } from "react";
import { Box, Button, VStack, Flex, Image } from "@chakra-ui/react";
import { AddIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { AddProducts } from "./AddProducts";
import { EditProducts } from "./EditProducts";
import { SalesDashboard } from "./SalesDashboard";
import { UsersDashboard } from "./UsersDashboard";
import { EditCategories } from "./EditCategories";

export const Admin = () => {
  const [selectedPanel, setSelectedPanel] = useState<string>();

  return (
    <Flex>
      <Box
        width="200px"
        p={4}
        backgroundColor="#3498DB"
        borderRightWidth="1px"
        minH="100vh"
      >
        <VStack spacing={4} align="stretch">
          <Image
            boxSize="150px"
            objectFit="cover"
            src="https://www.pngmart.com/files/21/Admin-Profile-PNG-Image.png"
            alt="Admin"
            mb={4}
          />
          <Button
            leftIcon={<AddIcon />}
            onClick={() => setSelectedPanel("add-product")}
          >
            Add product
          </Button>
          <Button
            leftIcon={<EditIcon />}
            onClick={() => setSelectedPanel("edit-product")}
          >
            Edit product
          </Button>
          <Button
            leftIcon={<ViewIcon />}
            onClick={() => setSelectedPanel("view-sales")}
          >
            View sales
          </Button>
          <Button
            leftIcon={<EditIcon />}
            onClick={() => setSelectedPanel("edit-categories")}
          >
            Edit categories
          </Button>
          <Button
            leftIcon={<ViewIcon />}
            onClick={() => setSelectedPanel("view-users")}
          >
            Users
          </Button>
        </VStack>
      </Box>
      <Box pl={16} flex="1">
        {selectedPanel === "add-product" && (
          <AddProducts setSelectedPanel={setSelectedPanel} />
        )}
        {selectedPanel === "edit-product" && <EditProducts />}
        {selectedPanel === "view-sales" && <SalesDashboard />}
        {selectedPanel === "view-users" && <UsersDashboard />}
        {selectedPanel === "edit-categories" && <EditCategories />}
      </Box>
    </Flex>
  );
};
