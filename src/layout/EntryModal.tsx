import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useModalStore } from "@/stores/modalstore";
import { useState, useEffect } from "react";
import axios from "axios";

interface Product {
  id: number;
  name: string;
}

export default function EntryModal() {
  const setModalState = useModalStore((state) => state.setModalState);

  const [products, setProducts] = useState<Product[]>([]);
  const [product_id, setProduct_id] = useState("");
  const [qty, setQty] = useState("");
  const [type, setType] = useState<"entrada" | "saida">("entrada");

  // Buscar produtos ao abrir o modal
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3001/products/");
        
        setProducts(res.data)
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar produtos!");
      }
    };
    
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!product_id || !qty || !type) {
    alert("Preencha todos os campos!");
    return;
  }

  if (type === "saida") {
    try {
      // Buscar estoque atual do produto
      const res = await axios.get(`http://localhost:3001/products/${product_id}`);
    
      const currentStock = res.data[0].qty; 
        console.log(currentStock);
        
      if (Number(qty) > currentStock) {
        alert(`Quantidade inválida! Você só tem ${currentStock} em estoque.`);
        return;
      }
    } catch (err) {
      console.error("Erro ao verificar estoque:", err);
      alert("Não foi possível verificar o estoque do produto.");
      return;
    }
  }

  try {
    await axios.post("http://localhost:5000/transactions", {
      product_id: Number(product_id),
      qty: Number(qty),
      type,
    });
    alert("Transação adicionada com sucesso!");
    setModalState(null);
  } catch (err) {
    console.error(err);
    alert("Erro ao adicionar transação!");
  }
};


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-accent/80">
      <Card className="max-w-md w-full">
        <CardContent>
          <h2 className="text-lg font-bold mb-4">Adicionar Transação</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Select Produto */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Produto
              </label>
              <Select onValueChange={(value) => setProduct_id(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um produto" />
                </SelectTrigger>
                <SelectContent>
                  {Array.isArray(products) &&  
                  
                  products.map((p) => (
                    <SelectItem key={p.id} value={String(p.id)}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Input Quantidade */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Quantidade
              </label>
              <Input
                type="number"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                placeholder="Digite a quantidade"
              />
            </div>

            {/* Select Tipo */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Tipo
              </label>
              <Select onValueChange={(value) => setType(value as "entrada" | "saida")} defaultValue="entrada">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entrada">Entrada</SelectItem>
                  <SelectItem value="saida">Saída</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Botões */}
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="destructive"
                onClick={() => setModalState(null)}
              >
                Cancelar
              </Button>
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
