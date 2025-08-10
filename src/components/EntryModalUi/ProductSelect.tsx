import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import type { Product } from '../../services/transaction.service';

interface Props {
	products: Product[];
	selectedId: string;
	onChange: (id: string) => void;
}

export default function ProductSelect({
	products,
	selectedId,
	onChange,
}: Props) {
	return (
		<div>
			<label className="block text-sm font-medium mb-1" htmlFor="product">
				Produto
				<Select onValueChange={onChange} value={selectedId}>
					<SelectTrigger>
						<SelectValue placeholder="Selecione um produto" />
					</SelectTrigger>
					<SelectContent>
						{products.map((p) => (
							<SelectItem key={p.id} value={String(p.id)}>
								{p.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</label>
		</div>
	);
}
