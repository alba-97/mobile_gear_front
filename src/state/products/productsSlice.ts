import { Product } from '@/interfaces/Product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProductState {
	products: Product[];
	discountedProducts: Product[];
	product: Product | null;
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
	name: 'products',
	initialState,
	reducers: {
		setProducts: (state, action: PayloadAction<Product[]>) => {
			state.products = action.payload;
		},
		setProduct: (state, action: PayloadAction<Product>) => {
			state.product = action.payload;
		},
		setDiscountedProducts: (state, action: PayloadAction<Product[]>) => {
			state.discountedProducts = action.payload;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},
		addProduct: (state, action: PayloadAction<Product>) => {
			state.products.push(action.payload);
		},
		editProduct: (state, action: PayloadAction<Product>) => {
			const updatedProduct = action.payload;
			const existingProduct = state.products.find(
				(product) => product.id === updatedProduct.id,
			);
			if (existingProduct) {
				Object.assign(existingProduct, updatedProduct);
			}
		},
		deleteProduct: (state, action: PayloadAction<number>) => {
			const productId = action.payload;
			state.products = state.products.filter(
				(product) => product.id !== productId,
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
