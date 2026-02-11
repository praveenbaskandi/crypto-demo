import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ticker } from './types';

interface CryptoState {
    tickers: Record<string, Ticker>;
    connectionStatus: 'connected' | 'disconnected' | 'connecting';
}

const initialState: CryptoState = {
    tickers: {},
    connectionStatus: 'disconnected',
};

const cryptoSlice = createSlice({
    name: 'crypto',
    initialState,
    reducers: {
        setConnectionStatus(state, action: PayloadAction<'connected' | 'disconnected' | 'connecting'>) {
            state.connectionStatus = action.payload;
        },
        updateTickers(state, action: PayloadAction<Record<string, Ticker>>) {
            // Immer handles immutability under the hood
            state.tickers = { ...state.tickers, ...action.payload };
        },
    },
});

export const { setConnectionStatus, updateTickers } = cryptoSlice.actions;
export default cryptoSlice.reducer;
