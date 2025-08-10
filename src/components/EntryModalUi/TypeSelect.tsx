import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

interface Props {
  value: "entrada" | "saida";
  onChange: (value: "entrada" | "saida") => void;
}

export default function TypeSelect({ value, onChange }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Tipo</label>
      <Select onValueChange={(val) => onChange(val as "entrada" | "saida")} value={value}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione o tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="entrada">Entrada</SelectItem>
          <SelectItem value="saida">Saída</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
