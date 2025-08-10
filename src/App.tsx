import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import List from "./layout/List";
import Nav from "./layout/Nav";
import { useHiddenStore } from "./stores/hiddenstore";
import { useCategoryStore } from "./stores/categorystore";

export default function App() {
  const hidden = useHiddenStore((state) => state.hidden);
  const setHidden = useHiddenStore((state) => state.setHidden);
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);

  return (
    <main className="p-6">
      <Card>
        <CardContent className="flex justify-between items-center">
          <div className="text-2xl">Painel de gerenciamento</div>

          <div className="text-2xl items-center mr-10">
            <Button onClick={() => setHidden(false)}>Entrada</Button>
            <Button onClick={() => setHidden(true)}>Saida</Button>
          </div>
        </CardContent>
      </Card>

      <Nav />

      {!hidden && selectedCategory?.id && <List />}
    </main>
  );
}
