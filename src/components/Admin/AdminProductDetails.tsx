import useInput from "../../hooks/useInput";

import { Box, Button, Input, Textarea } from "@chakra-ui/react";
import { editProduct } from "../../state/products/productsActions";
import { Product } from "@/interfaces/Product";
import { useDispatch } from "react-redux";

interface IAdminProductsDetailsProps {
  selectedProduct: Product;
  setSelectedProduct: (product: Product) => void;
}

export const AdminProductsDetails = ({
  selectedProduct,
  setSelectedProduct,
}: IAdminProductsDetailsProps) => {
  const name = useInput(selectedProduct.name);
  const features = useInput(selectedProduct.features);
  const price = useInput(`${selectedProduct.price}`);
  const stock = useInput(`${selectedProduct.stock}`);
  const product_img = useInput(selectedProduct.product_img);
  const description = useInput(selectedProduct.description);
  const discount = useInput(`${selectedProduct.discount}`);

  const dispatch = useDispatch();

  const handleSaveChanges = () => {
    const productData = {
      id: selectedProduct.id,
      name: name.value,
      product_img: product_img.value,
      description: description.value,
      features: features.value,
      price: parseFloat(`${price.value}`),
      discount: parseInt(`${discount.value}`),
      stock: Number(stock.value),
    };

    editProduct(productData)(dispatch);
    setSelectedProduct({ id: undefined });
  };

  return (
    <Box p={4}>
      <label>
        imagen:
        <Input
          name="img"
          value={product_img.value}
          onChange={product_img.onChange}
          mb={4}
        />
      </label>
      <label>
        Name:
        <Input name="name" value={name.value} onChange={name.onChange} mb={4} />
      </label>
      <label>
        Description:
        <Textarea
          name="description"
          value={description.value}
          onChange={description.onChange}
          mb={4}
        />
      </label>
      <label>
        Features:
        <Textarea
          name="features"
          value={features.value}
          onChange={features.onChange}
          mb={4}
        />
      </label>
      <label>
        Price:
        <Input
          name="price"
          value={price.value}
          onChange={price.onChange}
          mb={4}
        />
      </label>
      <label>
        Stock:
        <Input
          name="stock"
          value={stock.value}
          onChange={stock.onChange}
          mb={4}
        />
      </label>
      <label>
        Discount:
        <Input
          name="discount"
          value={discount.value}
          onChange={discount.onChange}
          mb={4}
        />
      </label>

      <Button colorScheme="blue" onClick={handleSaveChanges}>
        Save Changes
      </Button>
    </Box>
  );
};
