import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCategoryStore } from "../stores/categorystore";
import { useHiddenStore } from "../stores/hiddenstore";
import { updateProductsBulk } from '../services/updateProduct.service'; // criar essa função no service

export default function List() {
  const hidden = useHiddenStore((state) => state.hidden);
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      if (!selectedCategory?.id) return;

      try {
        const response = await axios.get(
          `http://localhost:3001/products/${selectedCategory.id}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }
    fetchProducts();
  }, [selectedCategory]);

  if (hidden) return null;

  function handleChange(index, field, value) {
    setProducts((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: field === "name" ? value : Number(value) };
      return copy;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await updateProductsBulk(products);
      alert(res.message);
    } catch (error) {
      alert(error.message || "Erro ao atualizar produtos");
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <Table>
          <TableCaption>Produtos da categoria {selectedCategory?.name}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead className="text-right">Preço</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>
                    <input
                      name={`name-${product.id}`}
                      value={product.name}
                      onChange={(e) => handleChange(index, "name", e.target.value)}
                      required
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      name={`qty-${product.id}`}
                      type="number"
                      value={product.qty}
                      onChange={(e) => handleChange(index, "qty", e.target.value)}
                      required
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <input
                      name={`price-${product.id}`}
                      type="number"
                      step="0.01"
                      value={product.price}
                      onChange={(e) => handleChange(index, "price", e.target.value)}
                      required
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Nenhum produto encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {products.length > 0 && (
          <div className="mt-4 flex justify-end">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Atualizar todos os produtos
            </button>
          </div>
        )}
      </form>
    </main>
  );
}
