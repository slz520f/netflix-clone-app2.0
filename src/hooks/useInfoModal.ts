import { create } from "zustand";

export interface ModalStoreInterface {
  movieId?: string;
  isOpen: boolean;
  openModal: (movieId: string) => void;
  closeModal: () => void; 
}

const useInfoModal = create<ModalStoreInterface>((set) => ({
  movieId: undefined,
  isOpen: false,
  openModal: (movieId: string) => {
    console.log("openModal が呼び出されました movieId:", movieId);  
    set({ isOpen: true, movieId });
  },
  closeModal: () => set({ isOpen: false, movieId: undefined }),
}));


export default useInfoModal;
