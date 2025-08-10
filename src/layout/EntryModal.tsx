import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/stores/modalstore";
import { useState, useEffect } from "react";
import ProductSelect from "../components/EntryModalUi/ProductSelect";
import QuantityInput from "../components/EntryModalUi/QuantityInput";
import TypeSelect from "../components/EntryModalUi/TypeSelect";
import { handleSubmit } from "@/services/handleSubmit.service";
import { fetchProducts, Product } from "../services/transaction.service";

export default function EntryModal() {
  const setModalState = useModalStore((state) => state.setModalState);

  const [products, setProducts] = useState<Product[]>([]);
  const [productId, setProductId] = useState("");
  const [qty, setQty] = useState("");
  const [type, setType] = useState<"entrada" | "saida">("entrada");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const prods = await fetchProducts();
        setProducts(prods);
      } catch {
        alert("Erro ao carregar produtos!");
      }
    }
    loadProducts();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    setError("");
    await handleSubmit({
      e,
      productId,
      qty,
      type,
      onSuccess() {
        alert("Transação adicionada com sucesso!");
        setModalState(null);
      },
      onError(msg) {
        setError(msg);
      },
    });
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-accent/80">
      <Card className="max-w-md w-full">
        <CardContent>
          <h2 className="text-lg font-bold mb-4">Adicionar Transação</h2>

          {error && <div className="mb-2 p-2 bg-red-300 text-red-800 rounded">{error}</div>}

          <form onSubmit={onSubmit} className="space-y-4">
            <ProductSelect products={products} selectedId={productId} onChange={setProductId} />
            <QuantityInput value={qty} onChange={setQty} />
            <TypeSelect value={type} onChange={setType} />

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="destructive" onClick={() => setModalState(null)}>
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
