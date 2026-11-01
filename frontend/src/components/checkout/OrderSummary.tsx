import { Trash, Ticket } from "lucide-react";
import { CustomUI, CustomButtons } from "../index.ts";
import { formatZAR } from "../../utils/priceUtils.ts";
import type { ShopItem } from "../../types/shopTypes.ts";

interface OrderSummaryProps {
    items: ShopItem[];
    subtotal: number;
    discount: number;
    total: number;
    removeItem: (item: ShopItem) => void;
};

const SummaryRow: React.FC<{ label: string, value: string, bold?: boolean }> = ({ label, value, bold = false }) => (
    <div className={`flex items-center justify-between text-sm text-umnyama ${bold ? "font-bold" : ""}`}>
        <span>{label}</span>
        <span>{value}</span>
    </div>
);

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, subtotal, discount, total, removeItem }) => {
    return (
        <aside className="w-full flex flex-col gap-4 bg-white/70 border border-umnyama/10 rounded-md p-5">
            <h2 className="text-base font-bold text-umnyama">Order Summary</h2>

            <ul className="flex flex-col gap-3">
                {items.map((item) => (
                    <li key={item.id} className="flex items-center justify-between gap-2 text-sm text-umnyama">
                        <div className="flex items-center gap-3">
                            <img src={item.cover} alt="" className="w-10 h-10 rounded-md shadow-xs shadow-gray-600" />
                            <div className="flex flex-col">
                                <span className="font-semibold">{item.name}</span>
                                <span className="text-xs text-umnyama/60">{item.specs[0]?.type}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>{formatZAR(item.price)}</span>
                            <CustomButtons.Default
                                disabled={false}
                                onClick={() => removeItem(item)}
                                title={`Remove ${item.name}`}
                                icon={<Trash size={14} className="text-umnyama/50 hover:text-red-600" />}
                            />
                        </div>
                    </li>
                ))}
            </ul>

            <CustomUI.DarkSeperator />

            <div className="flex flex-col gap-2">
                <SummaryRow label="Subtotal" value={formatZAR(subtotal)} />
                <SummaryRow label="Discount" value={discount > 0 ? `-${formatZAR(discount)}` : formatZAR(0)} />
            </div>

            <CustomUI.DarkSeperator />

            <SummaryRow label="Order Total" value={formatZAR(total)} bold />

            {discount > 0 && (
                <div className="flex items-center justify-between border border-lush bg-lush/10 rounded-md px-4 py-3 text-sm text-lush font-semibold">
                    <span>Your total saving on this order</span>
                    <span>{formatZAR(discount)}</span>
                </div>
            )}

            {/* coupons aren't supported by the backend yet, so the field stays disabled */}
            <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2 border border-umnyama/15 rounded-md px-3 py-2 text-umnyama/40">
                    <Ticket size={16} />
                    <input
                        disabled
                        placeholder="Coupon code"
                        className="w-full bg-transparent text-sm outline-none disabled:cursor-not-allowed"
                    />
                </div>
                <button
                    disabled
                    title="Coupons are coming soon"
                    className="px-4 py-2 border border-umnyama/15 rounded-md text-sm text-umnyama disabled:text-umnyama/40 disabled:cursor-not-allowed"
                >
                    Apply
                </button>
            </div>
        </aside>
    );
};
export default OrderSummary;
