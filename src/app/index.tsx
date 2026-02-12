import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import CryptoList from '../screens/CryptoList';

export default function Index() {
    return (
        <Provider store={store}>
            <CryptoList />
        </Provider>
    );
}
