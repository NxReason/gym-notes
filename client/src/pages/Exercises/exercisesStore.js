import { create } from 'zustand';

export const exerciseStore = create((set) => ({
  updatingId: null,
  setUpdatingId: (id) => set({ updatingId: id }),
}));
