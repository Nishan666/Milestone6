import axios from "axios";
import { resolve } from "./resolver";

const getProducts = async (page) => {
  const result = await axios.get(
    `https://fakestoreapi.in/api/products?limit=24&page=${page}`
  );
  return resolve(result.data);
};

export { getProducts };
