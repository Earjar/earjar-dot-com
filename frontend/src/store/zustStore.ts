import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as ShopTypes from "../types/shopTypes.ts";

export const useShopState = create<ShopTypes.ShopProps>()(
    persist (
        (set, get) => ({
            shopItems: [],
            addShopItem: (payload: ShopTypes.ShopItem) => set(() => {
                const currentItems = get().shopItems;
                
            }),
            clearShopItems: () => set(() => ({ shopItems: [] }))
        }),
        {
            name: 'earjar-shop-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
);