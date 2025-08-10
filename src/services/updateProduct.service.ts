import axios from "axios";

export async function updateProductsBulk(products) {
  try {
    const response = await axios.put("http://localhost:3001/products/update", products );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Erro ao atualizar produtos");
  }
}
