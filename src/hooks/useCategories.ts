import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export interface Category {
  id: string | number;
  name: string;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      try {
        const response = await axios.get<Category[]>('http://localhost:3001/category');
        setCategories(response.data);
      } catch (error: any) {
        toast.error(`Erro ao buscar categorias: ${error.message || error}`);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  return { categories, loading };
}
