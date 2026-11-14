import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import { Home, Shop, Privacy, Terms, Checkout, CheckoutSuccess, CheckoutCancelled, Landing } from "../views/index.ts";
import { SHOW_WIP_PAGES } from "../constants/features.ts";

export default function RouteProvider() {
    return (
        <Router>
            <Routes>
                {SHOW_WIP_PAGES ? (
                    <>
                        <Route path="/home" element={<Home />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/checkout/success" element={<CheckoutSuccess />} />
                        <Route path="/checkout/cancelled" element={<CheckoutCancelled />} />
                        <Route path="/*" element={<Navigate to="/home" />} />
                    </>
                ) : (
                    <>
                        <Route path="/" element={<Landing />} />
                        <Route path="/*" element={<Navigate to="/" replace />} />
                    </>
                )}
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
            </Routes>
        </Router>
    );
};
