import { create } from 'zustand';
import type { AuthType } from '#/features/auth/components/AuthModal';

interface AuthModalStore {
    isOpen: boolean;
    type: AuthType;
    openModal: (type?: AuthType) => void;
    closeModal: () => void;
    setType: (type: AuthType) => void;
}

export const useAuthModalStore = create<AuthModalStore>((set) => ({
    isOpen: false,
    type: 'login',
    openModal: (type = 'login') => set({ isOpen: true, type }),
    closeModal: () => set({ isOpen: false }),
    setType: (type) => set({ type }),
}));
