import * as Yup from "yup";

const AddProductSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  productImg: Yup.string().url("Invalid URL"),
  description: Yup.string().required("Description is required"),
  features: Yup.string(),
  price: Yup.number()
    .positive("Price must be a positive number")
    .required("Price is required"),
  discount: Yup.number()
    .min(0, "Discount can't be negative")
    .max(100, "Discount can't exceed 100%"),
  stock: Yup.number().integer("Stock must be an integer").required(),
  categoryId: Yup.number()
    .integer("Category is required")
    .required("Category is required"),
  brandId: Yup.number()
    .integer("Brand is required")
    .required("Brand is required"),
});

export default AddProductSchema;
