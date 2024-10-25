import { ProductResponse } from "@/interfaces/Product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductState {
  products: ProductResponse[];
  discountedProducts: ProductResponse[];
  product: ProductResponse | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  discountedProducts: [],
  product: null,
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductResponse[]>) => {
      state.products = action.payload;
    },
    setProduct: (state, action: PayloadAction<ProductResponse>) => {
      state.product = action.payload;
    },
    setDiscountedProducts: (
      state,
      action: PayloadAction<ProductResponse[]>
    ) => {
      state.discountedProducts = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addProduct: (state, action: PayloadAction<ProductResponse>) => {
      state.products.push(action.payload);
    },
    editProduct: (state, action: PayloadAction<ProductResponse>) => {
      const updatedProduct = action.payload;
      const existingProduct = state.products.find(
        (product) => product.id === updatedProduct.id
      );
      if (existingProduct) {
        Object.assign(existingProduct, updatedProduct);
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.products = state.products.filter(
        (product) => product.id !== productId
      );
    },
  },
});

export const {
  setProducts,
  setProduct,
  setDiscountedProducts,
  setLoading,
  setError,
  addProduct,
  editProduct,
  deleteProduct,
} = productsSlice.actions;
export default productsSlice.reducer;
