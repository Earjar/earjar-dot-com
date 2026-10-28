import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as ShopTypes from "../types/shopTypes.ts";

export const useShopState = create<ShopTypes.ShopProps>()(
    persist(
        (set) => ({
            shopItems: [],
            addShopItem: (payload: ShopTypes.ShopItem) => set((state) => ({
                shopItems: [...state.shopItems, payload]
            })),
            removeShopItem: (payload: ShopTypes.ShopItem) => set((state) => ({
                shopItems: state.shopItems.filter((item) => item.id !== payload.id)
            })),
            clearShopItems: () => set(() => ({ shopItems: [] }))
        }),
        {
            name: 'earjar-shop-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
);