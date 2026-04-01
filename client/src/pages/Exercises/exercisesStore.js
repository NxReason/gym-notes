import { create } from 'zustand';

export const exerciseStore = create((set) => ({
  isCreating: false,
}));
