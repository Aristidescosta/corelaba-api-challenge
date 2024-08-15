import { create } from 'zustand'

import { INoteType } from '../types'

type Store = {
    note: INoteType | null,
    isLoading: boolean;
    setNote: (note: INoteType) => void
    setLoading: (isLoading: boolean) => void
}

const initialStates = {
    note: null,
    isLoading: false
}

export const useNote = create<Store>()((set) => ({
    ...initialStates,
    setNote: (note: INoteType) => set(() => ({ note })),
    setLoading: (isLoading: boolean) => set(() => ({ isLoading })),
}))