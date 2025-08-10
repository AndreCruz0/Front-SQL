import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import List from "./layout/List";
import Nav from "./layout/Nav";

export default function App() {


  return (
    <main className="p-6">
       <Card>
      <CardContent className="flex justify-between items-center"> 
        <div className="text-2xl ">
          Painel de gerenciamento
          </div> 
          
         <div className="text-2xl items-center mr-10">
             <Button>Entrada</Button> 
            <Button>Saida</Button> 
         </div>
       </CardContent>
   </Card>

    <Nav />
    <List />
    
    </main>
  
  )
}

