export const CURRENCY_NAMES: Record<string, string> = {
    BTC: 'Bitcoin',
    ETH: 'Ethereum',
    BNB: 'Binance Coin',
    SOL: 'Solana',
    XRP: 'Ripple',
    ADA: 'Cardano',
    DOGE: 'Dogecoin',
    AVAX: 'Avalanche',
    DOT: 'Polkadot',
    TRX: 'TRON',
    MATIC: 'Polygon',
    LTC: 'Litecoin',
    SHIB: 'Shiba Inu',
    UNI: 'Uniswap',
    LINK: 'Chainlink',
    XLM: 'Stellar',
    ATOM: 'Cosmos',
    XMR: 'Monero',
    ETC: 'Ethereum Classic',
    BCH: 'Bitcoin Cash',
    FIL: 'Filecoin',
    LDO: 'Lido DAO',
    HBAR: 'Hedera',
    APT: 'Aptos',
    VET: 'VeChain',
    QNT: 'Quant',
    NEAR: 'NEAR Protocol',
    ALGO: 'Algorand',
    AAVE: 'Aave',
    GRT: 'The Graph',
    FTM: 'Fantom',
    EOS: 'EOS',
    SAND: 'The Sandbox',
    EGLD: 'MultiversX',
    THETA: 'Theta Network',
    MANA: 'Decentraland',
    AXS: 'Axie Infinity',
    FLOW: 'Flow',
    XTZ: 'Tezos',
    CHZ: 'Chiliz',
};

export const CURRENCY_LOGOS: Record<string, string> = {
    BTC: '₿',
    ETH: 'Ξ',
    BNB: '🔸',
    SOL: '◎',
    XRP: '✕',
    ADA: '₳',
    DOGE: '🐕',
    AVAX: '🔺',
    DOT: '●',
    TRX: '◆',
    MATIC: '🟣',
    LTC: 'Ł',
    SHIB: '🐶',
    UNI: '🦄',
    LINK: '🔗',
    XLM: '✦',
    ATOM: '⚛',
    XMR: 'ɱ',
    ETC: 'ξ',
    BCH: '฿',
    FIL: '📁',
    LDO: '🏛',
    HBAR: 'ℏ',
    APT: '🅰',
    VET: '✓',
    QNT: '🔢',
    NEAR: '🌐',
    ALGO: '△',
    AAVE: '👻',
    GRT: '📊',
    FTM: '👻',
    EOS: '▽',
    SAND: '🏖',
    EGLD: '⚡',
    THETA: 'θ',
    MANA: '🌍',
    AXS: '⚔',
    FLOW: '🌊',
    XTZ: 'ꜩ',
    CHZ: '🌶',
};

export const getCurrencyLogo = (symbol: string): string => {
    if (!symbol) return '💰';

    const upperSymbol = symbol.toUpperCase();

    // Handle common quote currencies
    const quoteCurrencies = ['USDT', 'BUSD', 'USDC', 'BTC', 'ETH', 'BNB'];

    for (const quote of quoteCurrencies) {
        if (upperSymbol.endsWith(quote)) {
            const baseSymbol = upperSymbol.slice(0, -quote.length);
            if (CURRENCY_LOGOS[baseSymbol]) {
                return CURRENCY_LOGOS[baseSymbol];
            }
        }
    }

    // Fallback: If exact match in our list
    if (CURRENCY_LOGOS[upperSymbol]) {
        return CURRENCY_LOGOS[upperSymbol];
    }

    return '💰';
};

export const getCurrencyName = (symbol: string): string => {
    if (!symbol) return '';

    const upperSymbol = symbol.toUpperCase();

    // Handle common quote currencies
    const quoteCurrencies = ['USDT', 'BUSD', 'USDC', 'BTC', 'ETH', 'BNB'];

    for (const quote of quoteCurrencies) {
        if (upperSymbol.endsWith(quote)) {
            const baseSymbol = upperSymbol.slice(0, -quote.length);
            if (CURRENCY_NAMES[baseSymbol]) {
                return CURRENCY_NAMES[baseSymbol];
            }
            // If we found a match for quote currency but base is not in our list,
            // return formatted pair e.g. "ABCD / USDT"
            if (baseSymbol.length > 0) {
                return `${baseSymbol} / ${quote}`;
            }
        }
    }

    // Fallback: If exact match in our list
    if (CURRENCY_NAMES[upperSymbol]) {
        return CURRENCY_NAMES[upperSymbol];
    }

    return upperSymbol;
};
