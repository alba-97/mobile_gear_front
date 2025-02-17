import { useState } from "react";
import { Button, Input, Grid, Text, IconButton } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import useInput from "../../hooks/useInput";

import { editCategory } from "../../state/categories/categoriesActions";
import { editCategory as editCategoryAction } from "../../state/categories/categoriesSlice";
import { CategoryResponse } from "@/interfaces/Category";
import { useDispatch } from "react-redux";

interface ICategoryCardProps {
  category: CategoryResponse;
  handleDelete: (
    category: CategoryResponse,
    event: React.MouseEvent<Element>
  ) => void;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: boolean;
}

export const CategoryCard = ({
  category,
  handleDelete,
  setRefetch,
  refetch,
}: ICategoryCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  let newCategory = useInput();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const dispatch = useDispatch();

  const handleSubmit = async (id: number) => {
    setIsEditing(false);
    try {
      await editCategory(id, newCategory.value);
      dispatch(editCategoryAction({ id, name: newCategory.value }));
    } catch (error) {
      console.error("edit error: ", error);
    } finally {
      setRefetch(!refetch);
    }
  };

  return (
    <Grid
      templateColumns="repeat(5, 1fr)"
      gap={6}
      alignItems="center"
      mb="5"
      key={category.id}
    >
      {isEditing ? (
        <Input {...newCategory}></Input>
      ) : (
        <Text fontWeight="bold">{category.name}</Text>
      )}
      {isEditing ? (
        <Button onClick={() => category.id && handleSubmit(category.id)}>
          Edit
        </Button>
      ) : (
        <IconButton
          aria-label="Edit category"
          icon={<EditIcon />}
          onClick={() => handleEdit()}
        />
      )}

      <IconButton
        aria-label="Delete category"
        icon={<DeleteIcon />}
        onClick={(event) => handleDelete(category, event)}
      />
    </Grid>
  );
};
