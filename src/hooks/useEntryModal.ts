// useEntryModal.ts
import { useState, useEffect } from "react";
import { fetchProducts, postTransaction, fetchProductStock, Product } from "@/services/transaction.service";

export function useEntryModal(setModalState: (state: null) => void) {
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
    e.preventDefault();
    setError("");

    if (!productId || !qty || !type) {
      setError("Preencha todos os campos!");
      return;
    }

    if (type === "saida") {
      try {
        const currentStock = await fetchProductStock(Number(productId));
        if (Number(qty) > currentStock) {
          setError(`Quantidade inválida! Você só tem ${currentStock} em estoque.`);
          return;
        }
      } catch {
        setError("Erro ao verificar estoque do produto.");
        return;
      }
    }

    try {
      await postTransaction({ product_id: Number(productId), qty: Number(qty), type });
      alert("Transação adicionada com sucesso!");
      setModalState(null);
    } catch {
      setError("Erro ao adicionar transação!");
    }
  }

  return {
    products,
    productId,
    setProductId,
    qty,
    setQty,
    type,
    setType,
    error,
    onSubmit,
  };
}
