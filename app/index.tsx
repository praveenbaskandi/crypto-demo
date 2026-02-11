import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import CryptoList from '../src/screens/CryptoList';

export default function Index() {
    return (
        <Provider store={store}>
            <CryptoList />
        </Provider>
    );
}
