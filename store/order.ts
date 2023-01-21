import create from "zustand";

type OrderStore = {
  quantity: number;
  incQantity: () => void;
  decQantity: () => void;
};

const useOrderStore = create<OrderStore>((set) => ({
  quantity: 1,
  incQantity: () =>
    set((prev) => ({
      quantity: prev.quantity + 1,
    })),
  decQantity: () =>
    set((prev) => ({
      quantity: prev.quantity - 1 === 0 ? 1 : prev.quantity - 1,
    })),
}));

export default useOrderStore;
