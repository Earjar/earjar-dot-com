import { makeRequest } from "./client.ts";
import type { CheckoutRequest, CheckoutResponse } from "../types/checkoutTypes.ts";

// there is no backend yet, so checkout is mocked unless VITE_MOCK_CHECKOUT=false is set in .env
const MOCK_CHECKOUT = import.meta.env.VITE_MOCK_CHECKOUT !== "false";

const mockCreateCheckout = async (): Promise<CheckoutResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const orderId = `MOCK-${Date.now().toString(36).toUpperCase()}`;
    // a real processor would send the user to its own payment page and redirect back to /checkout/success
    return { orderId, checkoutUrl: `/checkout/success?order=${orderId}` };
};

export const createCheckout = async (payload: CheckoutRequest): Promise<{ success: boolean, message?: string, data?: CheckoutResponse }> => {
    if (MOCK_CHECKOUT) {
        return { success: true, data: await mockCreateCheckout() };
    }

    const res = await makeRequest("POST", "/checkout", payload);
    if (!res.success || !res.data?.checkoutUrl) {
        return { success: false, message: typeof res.message === "string" ? res.message : "Could not start checkout, please try again." };
    }
    return { success: true, data: res.data as CheckoutResponse };
};
