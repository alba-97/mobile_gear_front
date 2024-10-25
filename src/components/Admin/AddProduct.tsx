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

const AddProduct = ({ setSelectedPanel }: IAddProductProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCategories()(dispatch);
  }, []);

  const handleSubmit = async (
    values: ProductForm,
    { setSubmitting }: FormikHelpers<ProductForm>
  ) => {
    await addProduct(values)(dispatch);
    setSelectedPanel("edit-product");
    setSubmitting(false);
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          product_img: "",
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
