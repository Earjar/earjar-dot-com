import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderTools, Footer, CheckoutForm, OrderSummary, CustomUI, CustomButtons } from "../components/index.ts";
import { useShopState } from "../store/zustStore.ts";
import { sumPrices } from "../utils/priceUtils.ts";

export default function Checkout() {
    const navigate = useNavigate();
    const { shopItems, removeShopItem } = useShopState();

    const subtotal = useMemo(() => sumPrices(shopItems), [shopItems]);
    // no coupons yet, this is where an applied discount would come from
    const discount = 0;
    const total = subtotal - discount;

    return (
        <main className="min-h-screen relative flex flex-col items-center justify-start gap-4 px-4">
            <HeaderTools />

            <section className="w-full min-h-screen flex flex-col gap-6 py-6">
                <CustomUI.MainHeader title="Checkout" />

                {shopItems.length === 0 ? (
                    <div className="flex flex-col items-start gap-3">
                        <p className="text-sm text-umnyama/70">Your cart is empty.</p>
                        <CustomButtons.Safe
                            disabled={false}
                            onClick={() => navigate("/shop")}
                            title="Go to the shop"
                            text="Browse the shop"
                        />
                    </div>
                ) : (
                    // on mobile the summary comes first so the total is visible before the form
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                        <div className="order-2 lg:order-1 lg:col-span-2">
                            <CheckoutForm items={shopItems} total={total} goBack={() => navigate("/shop")} />
                        </div>
                        <div className="order-1 lg:order-2">
                            <OrderSummary
                                items={shopItems}
                                subtotal={subtotal}
                                discount={discount}
                                total={total}
                                removeItem={removeShopItem}
                            />
                        </div>
                    </div>
                )}
            </section>

            <Footer />
        </main>
    );
};
