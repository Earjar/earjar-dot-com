export type ShippingAddress = {
    street: string;
    unit: string;
    suburb: string;
    city: string;
    province: string;
    postalCode: string;
};

export type Customer = {
    name: string;
    email: string;
};

// what the frontend sends to POST /checkout
// prices are never sent, the backend looks them up from the item ids so they can't be tampered with
export type CheckoutRequest = {
    items: { id: string, quantity: number }[];
    customer: Customer;
    shippingAddress: ShippingAddress;
};

// what the backend sends back once the payment processor has created a checkout session
export type CheckoutResponse = {
    orderId: string;
    // the processor's hosted payment page, the user gets redirected here
    checkoutUrl: string;
};
