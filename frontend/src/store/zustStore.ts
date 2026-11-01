import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as ShopTypes from "../types/shopTypes.ts";

export const useShopState = create<ShopTypes.ShopProps>()(
    persist(
        (set) => ({
            shopItems: [],
            addShopItem: (payload: ShopTypes.ShopItem) => set((state) => ({
                shopItems: state.shopItems.some((item) => item.id === payload.id)
                    ? state.shopItems
                    : [...state.shopItems, payload]
            })),
            removeShopItem: (payload: ShopTypes.ShopItem) => set((state) => ({
                shopItems: state.shopItems.filter((item) => item.id !== payload.id)
            })),
            clearShopItems: () => set(() => ({ shopItems: [] }))
        }),
        {
            name: 'earjar-shop-storage',
            storage: createJSONStorage(() => localStorage),
            // v1 stores prices in cents, carts saved before that had string prices so they are dropped
            version: 1,
            migrate: () => ({ shopItems: [] }) as unknown as ShopTypes.ShopProps
        }
    )
);