import { useState, useEffect } from "react";
import axios from "axios";
import { updateProductsBulk, Product } from "../services/updateProduct.service";

export function useProductBulkEdit(selectedCategory: { id?: number | string; name?: string }) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!selectedCategory?.id) {
      setProducts([]);
      return;
    }

    async function fetchProducts() {
      try {
        const response = await axios.get<Product[]>(`http://localhost:3001/products/category/${selectedCategory.id}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }

    fetchProducts();
  }, [selectedCategory]);

  function handleChange(index: number, field: keyof Product, value: string) {
    setProducts(prev => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        [field]: field === "name" ? value : Number(value),
      };
      return copy;
    });
  }

  async function handleSubmit() {
    try {
      const res = await updateProductsBulk(products);
      alert(res.message);
    } catch (error: any) {
      alert(error.message || "Erro ao atualizar produtos");
    }
  }

  return {
    products,
    handleChange,
    handleSubmit,
  };
}
