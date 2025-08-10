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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHiddenStore } from "../stores/hiddenstore";

export default function List() {
  const hidden = useHiddenStore(state => state.hidden);
    
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!hidden) {
      async function fetchProducts() {
        try {
          const res = await axios.get("http://localhost:3001/products/");
          setProducts(res.data.data);
        } catch (error) {
          console.error("Erro ao buscar produtos:", error);
        }
      }
      fetchProducts();
    }
  }, [hidden]);

  if (!hidden) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const updatedProducts = products.map((product) => ({
      id: product.id,
      name: formData.get(`name-${product.id}`),
      qty: Number(formData.get(`qty-${product.id}`)),
      price: Number(formData.get(`price-${product.id}`)),
    }));

    try {
      for (const p of updatedProducts) {
        await axios.put(`http://localhost:3001/products/update/${p.id}`, {
          name: p.name,
          qty: p.qty,
          price: p.price,
        });
      }
      alert("Produtos atualizados com sucesso!");
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Erro ao atualizar produtos", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Table>
        <TableCaption>Lista de produtos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>
                <Input
                  name={`name-${product.id}`}
                  defaultValue={product.name}
                  className="border p-1"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  name={`qty-${product.id}`}
                  defaultValue={product.qty}
                  className="border p-1 w-20"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  step="0.01"
                  name={`price-${product.id}`}
                  defaultValue={product.price}
                  className="border p-1 w-24 text-right"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 text-right">
        <Button type="submit">Salvar tudo</Button>
      </div>
    </form>
  );
}
