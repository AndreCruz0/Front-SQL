import { useState, useEffect } from 'react';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
}

export function useRegisterProductModal(setModalState: (state: any) => void) {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [price, setPrice] = useState<number | ''>('');
  const [qty, setQty] = useState<number | ''>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Busca categorias para select
    axios
      .get('http://localhost:3001/category/') 
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]));
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!categoryId) {
      setError('Selecione uma categoria');
      return;
    }
    if (!name || !price || !qty) {
      setError('Preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:3001/products/register', {
        name,
        category_id: categoryId,
        price,
        qty,
      });
      setModalState(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao cadastrar produto');
    } finally {
      setLoading(false);
    }
  }

  return {
    name,
    setName,
    categoryId,
    setCategoryId,
    price,
    setPrice,
    qty,
    setQty,
    categories,
    error,
    loading,
    onSubmit,
  };
}
