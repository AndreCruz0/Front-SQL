import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import List from "./layout/List";
import Nav from "./layout/Nav";
import { useHiddenStore } from "./stores/hiddenstore";
import { useCategoryStore } from "./stores/categorystore";
import { useModalStore } from "./stores/modalstore";
import EntryModal from "./layout/EntryModal";

export default function App() {
  const hidden = useHiddenStore((state) => state.hidden);
  const setHidden = useHiddenStore((state) => state.setHidden);
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);

  const modalState = useModalStore((state) => state.modalState);
  const setModalState = useModalStore((state) => state.setModalState);

  return (
    <main className="p-6">
      <Card>
        <CardContent className="flex justify-between items-center">
          <div className="text-2xl">Painel de gerenciamento</div>

          <div className="text-2xl items-center mr-10 space-x-4">
            <Button onClick={() => setModalState("entrada")}>Gerenciar Entradas e Saídas
</Button>
          </div>
        </CardContent>
      </Card>

      <Nav />

      {!hidden && selectedCategory?.id && <List />}

      {modalState === "entrada" && <EntryModal />}

    </main>
  );
}
