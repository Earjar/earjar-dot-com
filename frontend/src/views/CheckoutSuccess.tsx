import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { HeaderTools, Footer, CustomButtons } from "../components/index.ts";
import { useShopState } from "../store/zustStore.ts";

export default function CheckoutSuccess() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { clearShopItems } = useShopState();
    const orderId = searchParams.get("order");

    // landing here means the processor accepted the payment, so the cart is done
    // the backend still confirms the payment through the processor's webhook before fulfilling the order
    useEffect(() => {
        clearShopItems();
    }, [clearShopItems]);

    return (
        <main className="min-h-screen relative flex flex-col items-center justify-start gap-4 px-4">
            <HeaderTools />

            <section className="w-full min-h-screen flex flex-col items-center gap-4 py-16 text-center">
                <CheckCircle size={40} className="text-lush" />
                <h1 className="text-lg md:text-2xl font-light text-umnyama">Thank you for your order</h1>
                {orderId && (
                    <p className="text-sm text-umnyama/70">Order reference: <span className="font-bold text-umnyama">{orderId}</span></p>
                )}
                <p className="text-sm text-umnyama/70 max-w-md">A confirmation email with your order details is on its way. Keep your order reference in case you need to contact us.</p>
                <CustomButtons.Safe
                    disabled={false}
                    onClick={() => navigate("/shop")}
                    title="Back to the shop"
                    text="Back to the shop"
                />
            </section>

            <Footer />
        </main>
    );
};
