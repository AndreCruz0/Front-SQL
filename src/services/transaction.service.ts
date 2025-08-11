import axios from 'axios';

export interface Product {
	id: number;
	name: string;
	qty?: number;
}

const API_BASE_URL = 'http://localhost:3001';

export async function fetchProducts(): Promise<Product[]> {
	const res = await axios.get(`${API_BASE_URL}/products/list`);
	return res.data;
}

export async function fetchProductStock(productId: number): Promise<number> {
	const res = await axios.get(`${API_BASE_URL}/products/${productId}`);
	return res.data[0].qty;
}

export async function postTransaction(data: {
	product_id: number;
	qty: number;
	type: 'entrada' | 'saida';
}) {
	await axios.post('http://localhost:5000/transactions', data);
}
