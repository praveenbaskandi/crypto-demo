import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withTiming
} from 'react-native-reanimated';
import { Ticker } from '../redux/types';

interface TickerItemProps {
    item: Ticker;
}

const TickerItem: React.FC<TickerItemProps> = React.memo(({ item }) => {
    const prevPriceRef = useRef<number>(item.price);
    const backgroundColor = useSharedValue<string>('transparent');

    useEffect(() => {
        if (item.price > prevPriceRef.current) {
            // Price increased - Flash Green
            backgroundColor.value = withSequence(
                withTiming('rgba(0, 255, 0, 0.3)', { duration: 100 }),
                withTiming('transparent', { duration: 300 })
            );
        } else if (item.price < prevPriceRef.current) {
            // Price decreased - Flash Red
            backgroundColor.value = withSequence(
                withTiming('rgba(255, 0, 0, 0.3)', { duration: 100 }),
                withTiming('transparent', { duration: 300 })
            );
        }
        prevPriceRef.current = item.price;
    }, [item.price]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: backgroundColor.value,
        };
    });

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <View style={styles.mainRow}>
                <View style={styles.leftContainer}>
                    <Text style={styles.symbol}>{item.symbol.toUpperCase()}</Text>
                    <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                </View>
                <View style={styles.rightContainer}>
                    <View
                        style={[
                            styles.changePill,
                            { backgroundColor: item.percentChange >= 0 ? '#4CAF50' : '#F44336' },
                        ]}
                    >
                        <Text style={styles.percentChange}>
                            {item.percentChange >= 0 ? '+' : ''}
                            {item.percentChange.toFixed(2)}%
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.statsContainer}>
                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>High</Text>
                        <Text style={styles.statValue}>{item.high?.toFixed(2) ?? '-'}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Low</Text>
                        <Text style={styles.statValue}>{item.low?.toFixed(2) ?? '-'}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Vol</Text>
                        <Text style={styles.statValue}>
                            {item.volume ? (item.volume > 1000000
                                ? `${(item.volume / 1000000).toFixed(2)}M`
                                : item.volume > 1000
                                    ? `${(item.volume / 1000).toFixed(2)}K`
                                    : item.volume.toFixed(2))
                                : '-'}
                        </Text>
                    </View>
                </View>
                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Q.Vol</Text>
                        <Text style={styles.statValue}>
                            {item.quoteVolume ? (item.quoteVolume > 1000000
                                ? `${(item.quoteVolume / 1000000).toFixed(2)}M`
                                : item.quoteVolume > 1000
                                    ? `${(item.quoteVolume / 1000).toFixed(2)}K`
                                    : item.quoteVolume.toFixed(2))
                                : '-'}
                        </Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Trades</Text>
                        <Text style={styles.statValue}>{item.trades?.toLocaleString() ?? '-'}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Change</Text>
                        <Text style={{ ...styles.statValue, color: item.priceChange >= 0 ? 'green' : 'red' }}>
                            {item.priceChange?.toFixed(2)}
                        </Text>
                    </View>
                </View>
            </View>
        </Animated.View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginBottom: 12,
        marginHorizontal: 16,
        backgroundColor: 'white',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.02)',
    },
    mainRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
        width: '100%',
        zIndex: 1,
    },
    leftContainer: {
        flexDirection: 'column',
        gap: 4,
    },
    symbol: {
        fontSize: 17,
        fontWeight: '700',
        color: '#1a1a1a',
        letterSpacing: 0.5,
    },
    price: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
        letterSpacing: -0.5,
    },
    rightContainer: {
        alignItems: 'flex-end',
    },
    changePill: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        overflow: 'hidden',
    },
    percentChange: {
        fontSize: 14,
        fontWeight: '700',
        color: 'white',
    },
    statsContainer: {
        width: '100%',
        backgroundColor: '#f8f9fc',
        padding: 16,
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.04)',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    statItem: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        flex: 1,
    },
    statLabel: {
        fontSize: 11,
        color: '#8e9aaf',
        marginBottom: 4,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    statValue: {
        fontSize: 13,
        fontWeight: '600',
        color: '#2d3748',
    },
});

export default TickerItem;
