import { create } from 'zustand'

import { ITaskType } from '../types'

type Store = {
    task: ITaskType | null,
    isLoading: boolean;
    setTask: (task: ITaskType) => void
    setLoading: (isLoading: boolean) => void
}

const initialStates = {
    task: null,
    isLoading: false
}

export const useTask = create<Store>()((set) => ({
    ...initialStates,
    setTask: (task: ITaskType) => set(() => ({ task })),
    setLoading: (isLoading: boolean) => set(() => ({ isLoading })),
}))