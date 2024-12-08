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
import { CategoryResponse } from "@/interfaces/Category";
import {
  deleteCategory as deleteCategoryAction,
  addCategory as addCategoryAction,
  setCategories,
  setError,
  setLoading,
} from "../../state/categories/categoriesSlice";

import { AxiosError } from "axios";

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
    if (!category.id) return;
    try {
      deleteCategory(category.id);
      dispatch(deleteCategoryAction(category.id));
    } catch (error) {
      console.error("delete error: ", error);
    } finally {
      setRefetch(!refetch);
    }
  };

  const fetchData = async () => {
    dispatch(setLoading(true));
    try {
      const categories = await fetchCategories();
      dispatch(setCategories(categories));
    } catch (error) {
      if (error instanceof AxiosError) dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, [refetch]);

  const handleAdd = async () => {
    try {
      const name = "New category";
      addCategory(name);
      dispatch(addCategoryAction({ name }));
    } catch (error) {
      console.error("add error: ", error);
    }
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
