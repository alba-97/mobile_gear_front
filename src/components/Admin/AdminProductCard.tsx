import { Grid, Image, Text, IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { ProductResponse } from "@/interfaces/Product";

const truncateDescription = (description: string) => {
  if (description) {
    const words = description.split(" ");
    if (words.length > 10) {
      return words.slice(0, 10).join(" ") + "...";
    }
    return description;
  }
  return "";
};

interface IAdminProductCardProps {
  product: ProductResponse;
  handleDelete: (product: ProductResponse, event: React.MouseEvent) => void;
}

export const AdminProductCard = ({
  product,
  handleDelete,
}: IAdminProductCardProps) => {
  return (
    <Grid
      templateColumns="repeat(5, 1fr)"
      gap={6}
      alignItems="center"
      mb="5"
      key={product.id}
    >
      <Image
        src={product.product_img}
        alt={product.name}
        boxSize="50px"
        objectFit="cover"
      />
      <Text fontWeight="bold">{product.name}</Text>
      <Text>
        {product.description && truncateDescription(product.description)}
      </Text>
      <Text>{product.price}</Text>
      <IconButton
        aria-label="Delete product"
        icon={<DeleteIcon />}
        onClick={(event) => handleDelete(product, event)}
      />
    </Grid>
  );
};
