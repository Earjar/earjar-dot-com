// prices are stored in cents to avoid floating point errors when totalling
export const formatZAR = (cents: number) =>
    `R${(cents / 100).toFixed(2)}`;

export const sumPrices = (items: { price: number }[]) =>
    items.reduce((total, item) => total + item.price, 0);
