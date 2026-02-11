import { useEffect, useMemo } from 'react';
import { appStateManager } from '../infrastructure/services/AppStateManager';
import { webSocketClient } from '../infrastructure/services/WebSocketClient';
import { useAppSelector } from '../redux/hooks';
import { Ticker } from '../redux/types';

export const useCryptoList = () => {
    const tickers = useAppSelector((state) => state.crypto.tickers);
    const connectionStatus = useAppSelector((state) => state.crypto.connectionStatus);

    useEffect(() => {
        // Initialize services
        webSocketClient.connect();
        const appStateCleanup = appStateManager.init();

        return () => {
            webSocketClient.disconnect();
            appStateCleanup();
        };
    }, []);

    const tickerList = useMemo(() => {
        return (Object.values(tickers) as Ticker[]).sort((a, b) => a.symbol.localeCompare(b.symbol));
    }, [tickers]);

    return {
        tickerList,
        connectionStatus,
    };
};
