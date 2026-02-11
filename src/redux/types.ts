export interface TickerData {
    s: string; // Symbol
    c: string; // Current Price
    P: string; // Price change percent
    p: string; // Price change
    h: string; // High price
    l: string; // Low price
    v: string; // Volume
    q: string; // Quote Volume
    n: number; // Total trades
}

export interface Ticker {
    symbol: string;
    price: number;
    prevPrice?: number;
    percentChange: number;
    priceChange: number;
    high: number;
    low: number;
    volume: number;
    quoteVolume: number;
    trades: number;
}
