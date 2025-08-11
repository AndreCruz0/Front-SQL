import { selectTransitionVariants } from '@/animations/uiAnimations';
import { TableCell } from '@/components/ui/table';
import { motion } from 'framer-motion';

interface Product {
  id: string | number;
  name: string;
  qty: number | string;
  price: number | string;
}

interface ProductRowProps {
  product: Product;
  index: number;
  handleChange: (index: number, field: keyof Product, value: string) => void;
}

export function ProductRow({ product, index, handleChange }: ProductRowProps) {
  // Valores padrão para evitar undefined
  const { id = '', name = '', qty = 0, price = 0 } = product || {};

  return (
    <motion.tr
      key={id}
      layout
      variants={selectTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="hover:bg-gray-800 transition-colors"
    >
      <TableCell className="font-semibold text-gray-200">{id}</TableCell>

      <TableCell>
        <input
          className="w-full px-2 py-1 border border-gray-600 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-gray-500
                     bg-gray-900 text-gray-100"
          name={`name-${id}`}
          value={name}
          onChange={(e) => handleChange(index, 'name', e.target.value)}
          required
        />
      </TableCell>

      <TableCell>
        <input
          className="w-full px-2 py-1 border border-gray-600 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-gray-500
                     bg-gray-900 text-gray-100"
          name={`qty-${id}`}
          type="number"
          min={0}
          value={qty}
          onChange={(e) => handleChange(index, 'qty', e.target.value)}
          required
        />
      </TableCell>

      <TableCell className="text-right">
        <input
          className="w-full px-2 py-1 border border-gray-600 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-gray-500
                     bg-gray-900 text-gray-100 text-right"
          name={`price-${id}`}
          type="number"
          step="0.01"
          min={0}
          value={price}
          onChange={(e) => handleChange(index, 'price', e.target.value)}
          required
        />
      </TableCell>
    </motion.tr>
  );
}
