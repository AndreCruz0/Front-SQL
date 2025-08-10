import { fetchProductStock, postTransaction } from "../services/transaction.service";

interface SubmitParams {
  e: React.FormEvent;
  productId: string;
  type: "entrada" | "saida" | null;
  qty: string;
  onSuccess: () => void;
  onError: (msg: string) => void;
}

export async function handleSubmit({
  e,
  productId,
  type,
  qty,
  onSuccess,
  onError,
}: SubmitParams) {
  e.preventDefault();

  if (!productId || !qty || !type) {
    onError("Preencha todos os campos!");
    return;
  }

  if (type === "saida") {
    try {
      const currentStock = await fetchProductStock(Number(productId));
      if (Number(qty) > currentStock) {
        onError(`Quantidade inválida! Você só tem ${currentStock} em estoque.`);
        return;
      }
    } catch {
      onError("Erro ao verificar estoque do produto.");
      return;
    }
  }

  try {
    await postTransaction({
      product_id: Number(productId),
      qty: Number(qty),
      type,
    });
    onSuccess();
  } catch {
    onError("Erro ao adicionar transação!");
  }
}
