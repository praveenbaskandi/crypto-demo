import { setConnectionStatus, updateTickers } from '../../redux/cryptoSlice';
import { store } from '../../redux/store';
import { Ticker, TickerData } from '../../redux/types';

const BASE_URL = 'wss://stream.binance.com:9443/ws';
const RECONNECT_INTERVAL_BASE = 1000;
const MAX_RECONNECT_INTERVAL = 30000;
const FLUSH_INTERVAL = 1000;

const SYMBOLS = [
    'btcusdt', 'ethusdt', 'solusdt', 'bnbusdt', 'xrpusdt',
    'adausdt', 'dogeusdt', 'trxusdt', 'linkusdt', 'avaxusdt'
];

class WebSocketClient {
    private ws: WebSocket | null = null;
    private reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
    private flushInterval: ReturnType<typeof setInterval> | null = null;
    private reconnectAttempts = 0;
    private isExplicitlyClosed = false;
    private messageBuffer: Record<string, Ticker> = {};

    connect() {
        if (this.ws?.readyState === WebSocket.OPEN || this.ws?.readyState === WebSocket.CONNECTING) return;

        this.isExplicitlyClosed = false;
        this.ws = new WebSocket(BASE_URL);
        store.dispatch(setConnectionStatus('connecting'));

        this.ws.onopen = () => {
            console.log('WebSocket Connected');
            store.dispatch(setConnectionStatus('connected'));
            this.reconnectAttempts = 0;
            this.subscribe();
            this.startBufferFlush();
        };

        this.ws.onmessage = (event) => {
            // Handle aggressive buffering here
            try {
                const data = JSON.parse(event.data as string) as TickerData;
                if (data.s && data.c) {
                    this.bufferMessage(data);
                }
            } catch (e) {
                console.error('Failed to parse ticker data', e);
            }
        };

        this.ws.onclose = () => {
            console.log('WebSocket Closed');
            store.dispatch(setConnectionStatus('disconnected'));
            this.stopBufferFlush();
            if (!this.isExplicitlyClosed) {
                this.attemptReconnect();
            }
        };

        this.ws.onerror = (error) => {
            const errorMsg = error instanceof Error ? error.message : 'Unknown WebSocket Error';
            console.log(`WebSocket Error: ${errorMsg}`);
        };
    }

    private subscribe() {
        if (this.ws?.readyState === WebSocket.OPEN) {
            const params = SYMBOLS.map((s) => `${s}@ticker`);
            const payload = {
                method: 'SUBSCRIBE',
                params,
                id: 1,
            };
            this.ws.send(JSON.stringify(payload));
        }
    }

    private bufferMessage(data: TickerData) {
        const symbol = data.s;
        const currentPrice = parseFloat(data.c);
        const percentChange = parseFloat(data.P);
        const priceChange = parseFloat(data.p);
        const high = parseFloat(data.h);
        const low = parseFloat(data.l);
        const volume = parseFloat(data.v);
        const quoteVolume = parseFloat(data.q);
        const trades = data.n;

        this.messageBuffer[symbol] = {
            symbol,
            price: currentPrice,
            percentChange,
            priceChange,
            high,
            low,
            volume,
            quoteVolume,
            trades,
        };
    }

    private startBufferFlush() {
        if (this.flushInterval) clearInterval(this.flushInterval);
        this.flushInterval = setInterval(() => {
            this.flushBuffer();
        }, FLUSH_INTERVAL);
    }

    private stopBufferFlush() {
        if (this.flushInterval) {
            clearInterval(this.flushInterval);
            this.flushInterval = null;
        }
    }

    private flushBuffer() {
        const keys = Object.keys(this.messageBuffer);
        if (keys.length > 0) {
            store.dispatch(updateTickers(this.messageBuffer));
            this.messageBuffer = {}; // Clear buffer after flush
        }
    }

    private attemptReconnect() {
        const delay = Math.min(
            RECONNECT_INTERVAL_BASE * 2 ** this.reconnectAttempts,
            MAX_RECONNECT_INTERVAL
        );
        console.log(`Attempting reconnect in ${delay}ms (Attemp ${this.reconnectAttempts + 1})`);

        this.reconnectTimeout = setTimeout(() => {
            this.reconnectAttempts++;
            this.connect();
        }, delay);
    }

    disconnect() {
        this.isExplicitlyClosed = true;
        if (this.reconnectTimeout) clearTimeout(this.reconnectTimeout);
        this.stopBufferFlush();
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }
}

export const webSocketClient = new WebSocketClient();
