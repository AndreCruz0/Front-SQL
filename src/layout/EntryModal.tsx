import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useModalStore } from "@/stores/modalstore";
import ProductSelect from "../components/EntryModalUi/ProductSelect";
import QuantityInput from "../components/EntryModalUi/QuantityInput";
import TypeSelect from "../components/EntryModalUi/TypeSelect";
import { useEntryModal } from "../hooks/useEntryModal";

export default function EntryModal() {
	const setModalState = useModalStore((state) => state.setModalState);
	const {
		products,
		productId,
		setProductId,
		qty,
		setQty,
		type,
		setType,
		error,
		onSubmit,
	} = useEntryModal(setModalState);

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-accent/80">
			<Card className="max-w-md w-full">
				<CardContent>
					<h2 className="text-lg font-bold mb-4">Adicionar Transação</h2>

					{error && (
						<div className="mb-2 p-2 bg-red-300 text-red-800 rounded">
							{error}
						</div>
					)}

					<form onSubmit={onSubmit} className="space-y-4">
						<ProductSelect
							products={products}
							selectedId={productId}
							onChange={setProductId}
						/>
						<QuantityInput value={qty} onChange={setQty} />
						<TypeSelect value={type} onChange={setType} />

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
