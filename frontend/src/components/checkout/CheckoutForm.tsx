import { useState } from "react";
import { ChevronLeft, Lock } from "lucide-react";
import { CustomUI } from "../index.ts";
import { formatZAR } from "../../utils/priceUtils.ts";
import { createCheckout } from "../../api/checkout.ts";
import type { ShippingAddress } from "../../types/checkoutTypes.ts";
import type { ShopItem } from "../../types/shopTypes.ts";

interface CheckoutFormProps {
    items: ShopItem[];
    total: number;
    goBack: () => void;
};

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
// south african postal codes are 4 digits
const isValidPostalCode = (value: string) => /^\d{4}$/.test(value.trim());

const PROVINCES = [
    "Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", "Limpopo",
    "Mpumalanga", "North West", "Northern Cape", "Western Cape"
];

const emptyAddress: ShippingAddress = { street: "", unit: "", suburb: "", city: "", province: "", postalCode: "" };

const FieldLabel: React.FC<{ htmlFor: string, text: string }> = ({ htmlFor, text }) => (
    <label htmlFor={htmlFor} className="text-sm text-umnyama/80">{text}</label>
);

const CheckoutForm: React.FC<CheckoutFormProps> = ({ items, total, goBack }) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [address, setAddress] = useState<ShippingAddress>(emptyAddress);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const updateAddress = (field: keyof ShippingAddress) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
            setAddress((current) => ({ ...current, [field]: e.target.value }));

    // unit is the only optional address field
    const isAddressComplete = address.street.trim().length > 0
        && address.suburb.trim().length > 0
        && address.city.trim().length > 0
        && address.province.length > 0
        && isValidPostalCode(address.postalCode);

    const canPay = name.trim().length > 0 && isValidEmail(email) && isAddressComplete;

    const confirmPayment = async () => {
        setSubmitting(true);
        setError("");

        const res = await createCheckout({
            items: items.map((item) => ({ id: item.id, quantity: 1 })),
            customer: { name: name.trim(), email: email.trim() },
            shippingAddress: address
        });

        if (!res.success || !res.data) {
            setError(res.message ?? "Could not start checkout, please try again.");
            setSubmitting(false);
            return;
        }
        // hand over to the payment processor's page, it redirects back to /checkout/success or /checkout/cancelled
        window.location.assign(res.data.checkoutUrl);
    };

    return (
        <section className="w-full flex flex-col gap-6 bg-white/70 border border-umnyama/10 rounded-md p-5">
            <button onClick={goBack} className="self-start flex items-center gap-1 text-sm font-semibold text-umnyama">
                <ChevronLeft size={16} /> Back
            </button>

            <div className="flex flex-col gap-4">
                <h2 className="text-base font-bold text-umnyama">Contact details</h2>
                <p className="text-xs text-umnyama/60">Your license key and download link will be sent to this email address.</p>

                <div className="flex flex-col gap-1 max-w-md">
                    <FieldLabel htmlFor="checkout-name" text="Full name" />
                    <CustomUI.TextInput
                        id="checkout-name"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                    />
                </div>

                <div className="flex flex-col gap-1 max-w-md">
                    <FieldLabel htmlFor="checkout-email" text="Email address" />
                    <CustomUI.TextInput
                        id="checkout-email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <h2 className="text-base font-bold text-umnyama">Shipping address</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                    <div className="flex flex-col gap-1 sm:col-span-2">
                        <FieldLabel htmlFor="checkout-street" text="Street address" />
                        <CustomUI.TextInput
                            id="checkout-street"
                            autoComplete="address-line1"
                            value={address.street}
                            onChange={updateAddress("street")}
                            placeholder="12 Main Road"
                        />
                    </div>

                    <div className="flex flex-col gap-1 sm:col-span-2">
                        <FieldLabel htmlFor="checkout-unit" text="Apartment, unit or complex (optional)" />
                        <CustomUI.TextInput
                            id="checkout-unit"
                            autoComplete="address-line2"
                            value={address.unit}
                            onChange={updateAddress("unit")}
                            placeholder="Unit 4, Sunset Villas"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <FieldLabel htmlFor="checkout-suburb" text="Suburb" />
                        <CustomUI.TextInput
                            id="checkout-suburb"
                            autoComplete="address-level3"
                            value={address.suburb}
                            onChange={updateAddress("suburb")}
                            placeholder="Braamfontein"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <FieldLabel htmlFor="checkout-city" text="City" />
                        <CustomUI.TextInput
                            id="checkout-city"
                            autoComplete="address-level2"
                            value={address.city}
                            onChange={updateAddress("city")}
                            placeholder="Johannesburg"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <FieldLabel htmlFor="checkout-province" text="Province" />
                        <select
                            id="checkout-province"
                            autoComplete="address-level1"
                            value={address.province}
                            onChange={updateAddress("province")}
                            className={`border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black bg-transparent ${address.province ? "text-umnyama" : "text-umnyama/50"}`}
                        >
                            <option value="" disabled>Select a province</option>
                            {PROVINCES.map((province) => (
                                <option key={province} value={province}>{province}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <FieldLabel htmlFor="checkout-postal" text="Postal code" />
                        <CustomUI.TextInput
                            id="checkout-postal"
                            autoComplete="postal-code"
                            value={address.postalCode}
                            onChange={updateAddress("postalCode")}
                            placeholder="2001"
                        />
                        {address.postalCode.length > 0 && !isValidPostalCode(address.postalCode) && (
                            <span className="text-xs text-red-600">Postal codes are 4 digits.</span>
                        )}
                    </div>
                </div>
                <p className="text-xs text-umnyama/60">We currently only ship within South Africa.</p>
            </div>

            <div className="flex flex-col gap-4">
                <h2 className="text-base font-bold text-umnyama">Payment information</h2>
                {/* card details are entered in the payment processor's widget, never in our own inputs */}
                <div className="flex flex-col items-center justify-center gap-2 border border-dashed border-umnyama/25 rounded-md px-4 py-10 text-center">
                    <Lock size={20} className="text-umnyama/40" />
                    <p className="text-sm text-umnyama/70">You'll be taken to our payment provider's secure page to pay.</p>
                    <p className="text-xs text-umnyama/50">Card details are handled by our payment provider and never touch our servers.</p>
                </div>
            </div>

            {error && (
                <p role="alert" className="text-sm text-red-700 border border-red-600/30 bg-red-600/5 rounded-md px-4 py-3">{error}</p>
            )}

            <div className="flex items-center gap-3">
                <button
                    onClick={goBack}
                    className="px-6 py-2.5 border border-umnyama/20 rounded-md text-sm font-semibold text-umnyama hover:bg-umnyama/5"
                >
                    Back
                </button>
                <button
                    disabled={!canPay || submitting}
                    onClick={confirmPayment}
                    title={canPay ? "Confirm payment" : "Fill in your contact details and shipping address to continue"}
                    className="px-6 py-2.5 rounded-md text-sm font-semibold text-chalk bg-lush hover:bg-lush/90 disabled:bg-lush/40 disabled:cursor-not-allowed"
                >
                    {submitting ? "Redirecting to payment..." : `Confirm Payment ${formatZAR(total)}`}
                </button>
            </div>
        </section>
    );
};
export default CheckoutForm;
