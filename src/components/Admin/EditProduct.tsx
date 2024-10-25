import { editProduct } from "../../state/products/productsActions";
import { ProductForm, ProductResponse } from "@/interfaces/Product";
import { useDispatch } from "react-redux";
import { Formik, FormikHelpers } from "formik";
import AddProductSchema from "@/schemas/AddProductSchema";
import CreateEditProductForm from "./ProductForm";
import fromResponseToForm from "@/utils/product/fromResponseToForm";

interface IAdminProductsDetailsProps {
  selectedProduct: ProductResponse;
  setSelectedProduct: (product: ProductResponse | null) => void;
}

export const EditProduct = ({
  selectedProduct,
  setSelectedProduct,
}: IAdminProductsDetailsProps) => {
  const dispatch = useDispatch();

  const handleSubmit = async (
    values: ProductForm,
    { setSubmitting }: FormikHelpers<ProductForm>
  ) => {
    await editProduct(values)(dispatch);
    setSelectedProduct(null);
    setSubmitting(false);
  };

  return (
    <div>
      <Formik
        initialValues={fromResponseToForm(selectedProduct)}
        validationSchema={AddProductSchema}
        onSubmit={handleSubmit}
      >
        <CreateEditProductForm mode="Edit" />
      </Formik>
    </div>
  );
};
