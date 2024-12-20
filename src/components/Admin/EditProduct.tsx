import { editProduct } from "../../state/products/productsActions";
import { ProductForm, ProductResponse } from "@/interfaces/Product";
import { useDispatch } from "react-redux";
import { Formik, FormikHelpers } from "formik";
import AddProductSchema from "@/schemas/AddProductSchema";
import CreateEditProductForm from "./ProductForm";
import fromResponseToForm from "@/utils/product/fromResponseToForm";
import { setLoading } from "@/state/products/productsSlice";
import { fromFormToProductBody } from "@/utils/product/fromFormToProductBody";

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
    const data = fromFormToProductBody(values);
    await editProduct(selectedProduct.id, data);
    dispatch(setLoading(false));
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
