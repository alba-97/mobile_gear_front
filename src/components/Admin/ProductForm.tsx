import { Box, Button, Stack, useColorModeValue } from "@chakra-ui/react";
import { Form } from "formik";
import Field from "../Input/Field";
import Select from "../Input/Select";

interface IProductForm {
  mode: string;
}

const CreateEditProductForm = ({ mode }: IProductForm) => {
  return (
    <Form>
      <Box
        p={8}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg={useColorModeValue("white", "gray.700")}
        maxW="md"
        mx="auto"
        mt="10"
      >
        <Stack spacing={6}>
          <Field value="name" label="Model name" type="text" isRequired />
          <Field value="productImg" label="Image URL" type="text" />
          <Field
            value="description"
            label="Description"
            type="text"
            isRequired
          />
          <Field value="features" label="Features" type="text" />
          <Field
            value="price"
            label="Price"
            type="number"
            step="0.01"
            isRequired
          />
          <Field value="discount" label="Discount" type="number" />
          <Field value="stock" label="Stock" type="number" isRequired />

          <Select
            options={["Default", "Samsung", "Apple"]}
            value="brand"
            label="Brand"
          />

          <Select
            options={["Default", "Smartphones", "Tablets", "Accesories"]}
            value="category"
            label="Category"
          />

          <Button
            type="submit"
            backgroundColor="#3498DB"
            size="lg"
            fontSize="md"
            color="white"
          >
            {mode} Product
          </Button>
        </Stack>
      </Box>
    </Form>
  );
};

export default CreateEditProductForm;
