import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../../state/categories/categoriesActions";
import { addProduct } from "../../state/products/productsActions";

interface IAddProductProps {
  setSelectedPanel: (panel: string) => void;
}

import { Formik, FormikHelpers } from "formik";
import AddProductSchema from "@/schemas/AddProductSchema";
import CreateEditProductForm from "./ProductForm";
import { ProductForm } from "@/interfaces/Product";
import { setError, setLoading } from "@/state/products/productsSlice";
import { setCategories } from "@/state/categories/categoriesSlice";
import { AxiosError } from "axios";
import { fromFormToProductData } from "@/utils/product/fromFormToAddProductData";

const AddProduct = ({ setSelectedPanel }: IAddProductProps) => {
  const dispatch = useDispatch();

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
  }, []);

  const handleSubmit = async (
    values: ProductForm,
    { setSubmitting }: FormikHelpers<ProductForm>
  ) => {
    try {
      const data = fromFormToProductData(values);
      await addProduct(data);
    } catch (error) {
      console.error("Creation error:", error);
    }
    dispatch(setLoading(false));
    setSelectedPanel("edit-product");
    setSubmitting(false);
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          productImg: "",
          description: "",
          features: "",
          price: 0,
          discount: 0,
          stock: 0,
          categoryId: 1,
          brandId: 1,
        }}
        validationSchema={AddProductSchema}
        onSubmit={handleSubmit}
      >
        <CreateEditProductForm mode="Add" />
      </Formik>
    </div>
  );
};

export default AddProduct;
