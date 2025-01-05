import { useToast } from "@/hooks/use-toast"
import { Product } from "@/types/Product";
import React, { createContext, useContext, useState } from "react";

interface ProductContextProps {
  products: Product[];
  addProduct: (product: Product) => void;
  fetchProducts: (page: number, pageSize: number) => Product[];
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const { toast } = useToast();
  
    const addProduct = (product: Product) => {
        setProducts((prevProducts) => [...prevProducts, product]);
        toast({ title: "Product added successfully." })
      };

    const fetchProducts = (page: number, pageSize: number) => {
      const sortedProducts = [...products].sort((a, b) => a.value - b.value);
    
      const paginatedProducts = sortedProducts.slice(
        (page - 1) * pageSize,
        page * pageSize
      );
    
      return paginatedProducts
    }

    return (
      <ProductContext.Provider
        value={{ products, addProduct, fetchProducts }}
      >
        {children}
      </ProductContext.Provider>
    );
  };

export const useProducts = () => {
const context = useContext(ProductContext);
if (!context) {
    throw new Error("useProducts deve ser usado dentro de um UserProvider");
}
return context;
};