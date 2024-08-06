import axios, { AxiosError } from 'axios';

import * as settings from '../../settings';
import { Product } from '@/interfaces/Product';
import {
	setDiscountedProducts,
	setError,
	setLoading,
	setProduct,
	setProducts,
	deleteProduct as deleteProductAction,
} from './productsSlice';
import { Dispatch } from 'redux';
import getHeaders from '@/hooks/getHeaders';

export const fetchProducts =
	(searchTerm: string = '', filters = {}) =>
	async (dispatch: Dispatch) => {
		dispatch(setLoading(true));
		try {
			const response = await axios.get<Product[]>(
				`${settings.axiosURL}/products`,
				{
					params: {
						...filters,
						modelName: searchTerm,
					},
				},
			);
			dispatch(setProducts(response.data));
		} catch (error) {
			if (error instanceof AxiosError) dispatch(setError(error.message));
		} finally {
			dispatch(setLoading(false));
		}
	};

export const fetchProduct =
	(productId: number) => async (dispatch: Dispatch) => {
		try {
			const response = await axios.get(
				`${settings.axiosURL}/products/${productId}`,
			);
			dispatch(setProduct(response.data));
		} catch (error) {
			if (error instanceof AxiosError) dispatch(setError(error.message));
		} finally {
			dispatch(setLoading(false));
		}
	};

export const fetchDiscountedProducts = async (dispatch: Dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await axios.get(
			`${settings.axiosURL}/products/discounted`,
		);

		dispatch(setDiscountedProducts(response.data));
	} catch (error) {
		if (error instanceof AxiosError) dispatch(setError(error.message));
	} finally {
		dispatch(setLoading(false));
	}
};

export const addProduct = (productData: Product) => async () => {
	try {
		await axios.post(
			`${settings.axiosURL}/admin/products`,
			productData,
			getHeaders(),
		);
	} catch (error) {
		console.error('Login error:', error);
	}
};

export const editProduct = (product: Product) => async () => {
	try {
		const {
			id,
			name,
			stock,
			description,
			price,
			discount,
			features,
			product_img,
		} = product;
		await axios.put(
			`${settings.axiosURL}/admin/products/${id}`,
			{
				name,
				description,
				stock,
				price,
				discount,
				features,
				product_img,
			},
			getHeaders(),
		);
	} catch (error) {
		console.error('edit error: ', error);
	}
};

export const deleteProduct =
	(productId: number) => async (dispatch: Dispatch) => {
		try {
			await axios.delete(
				`${settings.axiosURL}/admin/products/${productId}`,
				getHeaders(),
			);
			dispatch(deleteProductAction(productId));
		} catch (error) {
			console.error('delete error: ', error);
		}
	};
