import { handleErrorMessage } from '@/utils/errorUtils';
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import {
  type Product,
  updateProductsBulk,
} from '../services/updateProduct.service';

export function useProductBulkEdit(selectedCategory: {
  id?: number | string;
  name?: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar produtos (refetch)
  const fetchProducts = useCallback(async () => {
    if (!selectedCategory?.id) {
      setProducts([]);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get<Product[]>(
        `http://localhost:3001/products/category/${selectedCategory.id}`,
      );
      setProducts(response.data);
    } catch (error: unknown) {
      toast.error(`Erro ao buscar produtos: ${error}`);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  function handleChange(index: number, field: keyof Product, value: string) {
    setProducts((prev) => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        [field]: field === 'name' ? value : Number(value),
      };
      return copy;
    });
  }

  async function handleSubmit() {
    try {
      const res = await updateProductsBulk(products);
      toast.success(res.message);
      // Recarrega a lista depois de salvar
      await fetchProducts();
    } catch (error: unknown) {
      toast.error(handleErrorMessage(error) || 'Erro ao atualizar produtos');
    }
  }

  return {
    products,
    loading,
    handleChange,
    handleSubmit,
    refetch: fetchProducts, 
  };
}
