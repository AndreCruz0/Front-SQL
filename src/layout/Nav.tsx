import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useCategoryStore } from "../stores/categorystore";
import { useHiddenStore } from "../stores/hiddenstore";
import axios from "axios";

export default function Nav() {
  const [categories, setCategories] = useState([]);
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);
  const setSelectedCategory = useCategoryStore((state) => state.setSelectedCategory);
  const hidden = useHiddenStore((state) => state.hidden);
  const setHidden = useHiddenStore((state) => state.setHidden);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3001/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav className="flex gap-4">
      {categories.map((category) => (
        <Card key={category.id}>
          <CardContent>
            <Button
              className="cursor-pointer"
              onClick={() => {
                if (selectedCategory.id === category.id) {
                  
                  setHidden(true);
                  setSelectedCategory({ id: "", name: "" }); 
                } 
                   setSelectedCategory(category);
                  if (hidden) setHidden(false);
              }}
            >
              {category.name}
            </Button>
          </CardContent>
        </Card>
      ))}
    </nav>
  );
}
