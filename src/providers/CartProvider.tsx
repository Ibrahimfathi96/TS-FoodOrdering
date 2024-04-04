import { CartItem, Product } from "@/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type CartType = {
  items: CartItem[];
  onAddItem: (product: Product, size: CartItem["size"]) => void;
};
export const CartContext = createContext<CartType>({
  items: [],
  onAddItem: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const onAddItem = (product: Product, size: CartItem["size"]) => {
    // if the item is already in the cart, increase the quantity
    const newCartItem: CartItem = {
      product: product,
      size: size,
      quantity: 1,
      product_id: product.id,
      id: "1", // TODO: generate unique id
    };

    setItems([newCartItem, ...items]);
  };
  return (
    <CartContext.Provider
      value={{
        items,
        onAddItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
