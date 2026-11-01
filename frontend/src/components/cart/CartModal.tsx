import { useMemo, useState } from "react";
import { CustomUI, CustomButtons } from "../index.ts";
import { ShoppingCart, Trash } from "lucide-react";
import { useShopState } from "../../store/zustStore.ts";
import { useNavigate } from "react-router-dom";
import { formatZAR, sumPrices } from "../../utils/priceUtils.ts";

const CartModal = () => {
    const navigate = useNavigate();

    const { shopItems, removeShopItem } = useShopState();
    const [cartOpen, setCartOpen] = useState<boolean>(false);

    const visibleShopItems = useMemo(() => {
        const currentShopItems = shopItems.map((items) => items);
        return currentShopItems;
    }, [shopItems]);

    const cartTotal = useMemo(() => sumPrices(visibleShopItems), [visibleShopItems]);

    const goToCheckout = () => {
        setCartOpen(false);
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
                <div className="absolute -top-1 -right-1 bg-lush rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                    <span className="text-[10px] font-bold leading-none text-chalk">{visibleShopItems.length}</span>
                </div>
            )}
            <CustomUI.PopupModalTR title="Current Order" isVisible={cartOpen} setVisible={setCartOpen}>

                <div className="h-full">
                    <div className="flex flex-col items-start gap-2">
                        {visibleShopItems.length === 0 && (<p>This cart is empty</p>)}

                        <ul className="flex-1 w-full flex flex-col gap-2">
                            {visibleShopItems.length > 0 && visibleShopItems.map((item) => (
                                <li key={item.id} className="flex items-start justify-between gap-2 text-umnyama text-xs">
                                    <div className="flex items-start justify-start gap-2">
                                        <img src={item.cover} className="w-15 h-15 shadow-xs shadow-gray-600 rounded-lg" />
                                        <div className="grid grid-cols-1 gap-1">
                                            <span className="text-sm font-bold">{item.name}</span>
                                            <span className="text-xs">{item.specs[0].type}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        <span>{formatZAR(item.price)}</span>
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

                        {visibleShopItems.length > 0 && (
                            <div className="w-full flex items-center justify-between border-t border-umnyama/15 pt-2 text-sm text-umnyama">
                                <span>Total</span>
                                <span className="font-bold">{formatZAR(cartTotal)}</span>
                            </div>
                        )}

                        <div className="">
                            <CustomButtons.Checkout
                                disabled={visibleShopItems.length === 0}
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