import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";
import { HeaderTools, Footer, CustomButtons } from "../components/index.ts";

export default function CheckoutCancelled() {
    const navigate = useNavigate();

    // the cart is left untouched so the user can try again
    return (
        <main className="min-h-screen relative flex flex-col items-center justify-start gap-4 px-4">
            <HeaderTools />

            <section className="w-full min-h-screen flex flex-col items-center gap-4 py-16 text-center">
                <XCircle size={40} className="text-umnyama/40" />
                <h1 className="text-lg md:text-2xl font-light text-umnyama">Payment cancelled</h1>
                <p className="text-sm text-umnyama/70 max-w-md">You haven't been charged. Your cart has been saved, so you can pick up where you left off.</p>
                <div className="flex items-center gap-3">
                    <CustomButtons.Safe
                        disabled={false}
                        onClick={() => navigate("/checkout")}
                        title="Return to checkout"
                        text="Return to checkout"
                    />
                    <CustomButtons.Default
                        disabled={false}
                        onClick={() => navigate("/shop")}
                        title="Keep shopping"
                        text="Keep shopping"
                    />
                </div>
            </section>

            <Footer />
        </main>
    );
};
