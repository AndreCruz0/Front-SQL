import axios from 'axios';

export interface Product {
	id: number;
	name: string;
	qty: number;
	price: number;
}

export async function updateProductsBulk(products: Product[]) {
	const response = await axios.put(
		'http://localhost:3001/products/bulk-update',
		products,
	);
	return response.data;
}
