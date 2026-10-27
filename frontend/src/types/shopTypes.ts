export type ShopItem = {
    id: string | number;
    name: string;
    price: number;
    type: string;
}
export interface ShopProps
{
    shopItems: ShopItem[];
    addShopItem: (payload: ShopItem) => void;
    clearShopItems: () => void;
}