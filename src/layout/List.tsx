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

import { useSelectedCategoryStore } from "../stores/categorystoreselected";
import { useHiddenStore } from "../stores/hiddenstore";
import { useProductBulkEdit } from "../hooks/useProductBulkEdit";

export default function List() {
  const hidden = useHiddenStore((state) => state.hidden);
  const selectedCategory = useSelectedCategoryStore((state) => state.selectedCategory);

  const { products, handleChange, handleSubmit } = useProductBulkEdit(selectedCategory);

  if (hidden) return null;

  return (
    <main>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Table>
          <TableCaption>Produtos da categoria {selectedCategory?.name}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead className="text-right">Preço</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>
                    <input
                      name={`name-${product.id}`}
                      value={product.name}
                      onChange={(e) => handleChange(index, "name", e.target.value)}
                      required
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      name={`qty-${product.id}`}
                      type="number"
                      value={product.qty}
                      onChange={(e) => handleChange(index, "qty", e.target.value)}
                      required
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <input
                      name={`price-${product.id}`}
                      type="number"
                      step="0.01"
                      value={product.price}
                      onChange={(e) => handleChange(index, "price", e.target.value)}
                      required
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Nenhum produto encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {products.length > 0 && (
          <div className="mt-4 flex justify-end">
            <Button type="submit">Atualizar todos os produtos</Button>
          </div>
        )}
      </form>
    </main>
  );
}
