import {create} from 'zustand'
import { devtools } from 'zustand/middleware'

export const useWindow = create(devtools((set, get) => ({
    browser: {},
    setBrowser: (browser) => set({browser}),

    windowOptions: {},
    setWindowOptions: (windowOptions) => set({windowOptions}),

    cards: {
        items: [1, 2, 3, 4, 5],
        activeItem: 0
    },

    addCard: (card) => set(...cards, cards.items = [...cards.items, card]),
    setActiveCard: (card) => set(...cards, cards.activeItem = [card]),

})))