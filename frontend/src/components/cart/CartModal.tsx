import { useMemo, useState } from "react";
import { CustomUI, CustomButtons } from "../index.ts";
import { ShoppingCart, Trash } from "lucide-react";
import { useShopState } from "../../store/zustStore.ts";
import { useNavigate } from "react-router-dom";

const CartModal = () => {
    const navigate = useNavigate();

    const { shopItems, removeShopItem } = useShopState();
    const [cartOpen, setCartOpen] = useState<boolean>(false);

    const visibleShopItems = useMemo(() => {
        const currentShopItems = shopItems.map((items) => items);
        return currentShopItems;
    }, [shopItems]);

    const goToCheckout = () => {
        navigate("/checkout");
    };
    
    return (
        <div className="relative">
            <CustomButtons.Default
                disabled={false}
                onClick={() => setCartOpen(!cartOpen)}
                title="Open the shopping cart"
                text="Cart"
                icon={<ShoppingCart size={16} />}
            />
            {visibleShopItems.length > 0 && (
                <div className="absolute top-0 right-0 bg-lush rounded-full h-3 w-3 p-1 flex items-center justify-center animate-pulse">
                    <span className="text-[10px] text-chalk">{visibleShopItems.length}</span>
                </div>
            )}
            <CustomUI.PopupModalTR title="Current Order" isVisible={cartOpen} setVisible={setCartOpen}>

                <div className="h-full">
                    <div className="flex flex-col items-start gap-2">
                        {visibleShopItems.length === 0 && (<p>This cart is empty</p>)}

                        <ul className="flex-1 w-full flex flex-col gap-2">
                            {visibleShopItems.length > 0 && visibleShopItems.map((item) => (
                                <li className="flex items-start justify-between gap-2 text-umnyama text-xs">
                                    <div className="flex items-start justify-start gap-2">
                                        <img src={item.cover} className="w-15 h-15 shadow-xs shadow-gray-600 rounded-lg" />
                                        <div className="grid grid-cols-1 gap-1">
                                            <span className="text-sm font-bold">{item.name}</span>
                                            <span className="text-xs">{item.specs[0].type}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        <span>{item.price}</span>
                                        <CustomButtons.Warn
                                            disabled={false}
                                            onClick={() => removeShopItem(item)}
                                            title="Remove this item"
                                            icon={<Trash size={16} />}
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="">
                            <CustomButtons.Checkout
                                disabled={false}
                                onClick={goToCheckout}
                                title="Checkout"
                                text="Checkout"
                            />
                        </div>
                    </div>
                </div>
            </CustomUI.PopupModalTR>
        </div>
    )
}
export default CartModal;