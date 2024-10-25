import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Box } from "@chakra-ui/react";
import { CategoryCard } from "./CategoryCard";
import {
  fetchCategories,
  deleteCategory,
  addCategory,
} from "../../state/categories/categoriesActions";
import { RootState } from "@/state/store";
import { CategoryResponse } from "@/interfaces/Product";

export const CategoryGrid = () => {
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  const [refetch, setRefetch] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = (
    category: CategoryResponse,
    event: React.MouseEvent<Element>
  ) => {
    event.stopPropagation();
    category.id && deleteCategory(category.id)(dispatch);
    setRefetch(!refetch);
  };

  useEffect(() => {
    fetchCategories()(dispatch);
  }, [refetch]);

  const handleAdd = () => {
    addCategory("New category")(dispatch);
    setRefetch(!refetch);
  };

  return (
    <Box p="5">
      {categories.map((category) => {
        return (
          <div style={{ cursor: "pointer" }} key={category.id}>
            <CategoryCard
              category={category}
              handleDelete={handleDelete}
              setRefetch={setRefetch}
              refetch={refetch}
            />
          </div>
        );
      })}
      <Button onClick={handleAdd}>Add</Button>
    </Box>
  );
};
