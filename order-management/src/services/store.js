import create from "zustand";

export const useStore = create((set) => ({
  orders: [],
  setOrders: (data) => set((state) => (state.orders = data)),
}));
