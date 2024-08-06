import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../state/products/productsActions';
import { Box } from '@chakra-ui/react';
import { AdminProductCard } from './AdminProductCard';
import { AdminProductsDetails } from './AdminProductDetails';
import { deleteProduct } from '../../state/products/productsActions';
import { ProductState } from '@/state/products/productsSlice';
import { Product } from '@/interfaces/Product';

export const AdminProductsGrid = () => {
	const dispatch = useDispatch();
	const products = useSelector(
		(state: { products: ProductState }) => state.products.products,
	);
	const [selectedProduct, setSelectedProduct] = React.useState({});
	const [refetch, setRefetch] = useState(false);

	const handleDelete = (
		product: Product,
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		event.stopPropagation();
		dispatch(deleteProduct(product.id));
		setRefetch(!refetch);
	};

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch, refetch]);

	const handleClick = (product: Product) => {
		setSelectedProduct(product);
	};

	return !selectedProduct.id ? (
		<Box p="5">
			{products.map((product) => {
				return (
					<div
						style={{ cursor: 'pointer' }}
						key={product.id}
						onClick={() => {
							handleClick(product);
						}}
					>
						<AdminProductCard product={product} handleDelete={handleDelete} />
					</div>
				);
			})}
		</Box>
	) : (
		<AdminProductsDetails
			selectedProduct={selectedProduct}
			setSelectedProduct={setSelectedProduct}
		/>
	);
};
