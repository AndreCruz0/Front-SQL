import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Product } from "../../services/transaction.service";

interface Props {
  products: Product[];
  selectedId: string;
  onChange: (id: string) => void;
}

export default function ProductSelect({ products, selectedId, onChange }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Produto</label>
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
    </div>
  );
}
