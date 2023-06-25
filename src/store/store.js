import {create} from 'zustand'
import { devtools } from 'zustand/middleware'

export const useWindow = create(devtools((set, get) => ({
    browser: {},
    setBrowser: (browser) => set({browser}),

    windowOptions: {},
    setWindowOptions: (windowOptions) => set({windowOptions}),
})))