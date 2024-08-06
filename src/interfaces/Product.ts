interface Brand {
	id: number;
	name: string;
}

interface Category {
	id: number;
	name: string;
}

export interface Product {
	id?: number;
	name?: string;
	product_img?: string;
	description?: string;
	features?: string;
	price?: number;
	discount?: number;
	stock?: number;
	brand?: Brand;
	category?: Category;
}
