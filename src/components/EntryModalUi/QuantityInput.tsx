import { Input } from "@/components/ui/input";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function QuantityInput({ value, onChange }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Quantidade</label>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Digite a quantidade"
      />
    </div>
  );
}
