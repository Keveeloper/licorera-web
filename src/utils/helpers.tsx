import roundHalfEven from "round-half-even";

const PLACE_HOLDER = "--";

export const CurrencyFormat = (amount: number | undefined | string) => {
    if (typeof amount === "undefined" || amount == null) {
        return PLACE_HOLDER;
    }
    let dollars = +amount;
    dollars = roundHalfEven(dollars, 2);
    return dollars.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).replace(/\$/, "$ ");
};

export const JotaFormat = (value: string | number | undefined) => {
    if (typeof value === "undefined" || value == null) {
        return PLACE_HOLDER;
    }
    const parsedValue = typeof value === "string" ? Number(value) : value;
    return parsedValue.toFixed(0) + " J";
};