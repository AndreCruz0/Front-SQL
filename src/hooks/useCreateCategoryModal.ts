import { useState } from 'react';
import axios from 'axios';

export function useCreateCategoryModal(setModalState: (state: any) => void) {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await axios.post('http://localhost:3001/category/create', { name });
      setModalState(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar categoria');
    } finally {
      setLoading(false);
    }
  }

  return { name, setName, error, loading, onSubmit };
}
