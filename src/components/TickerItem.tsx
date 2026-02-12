import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { COLORS } from "../constants/color";
import { STRINGS } from "../constants/string";
import { Ticker } from "../redux/types";

interface TickerItemProps {
  item: Ticker;
}

const TickerItem: React.FC<TickerItemProps> = React.memo(({ item }) => {
  const prevPriceRef = useRef<number>(item.price);
  const backgroundColor = useSharedValue<string>(COLORS.transparent);

  useEffect(() => {
    if (item.price > prevPriceRef.current) {
      // Price increased - Flash Green
      backgroundColor.value = withSequence(
        withTiming(COLORS.flashGreen, { duration: 100 }),
        withTiming(COLORS.transparent, { duration: 300 }),
      );
    } else if (item.price < prevPriceRef.current) {
      // Price decreased - Flash Red
      backgroundColor.value = withSequence(
        withTiming(COLORS.flashRed, { duration: 100 }),
        withTiming(COLORS.transparent, { duration: 300 }),
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
          <Text style={styles.price}>
            {STRINGS.pricePrefix}
            {item.price.toFixed(2)}
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <View
            style={[
              styles.changePill,
              {
                backgroundColor:
                  item.percentChange >= 0
                    ? COLORS.positiveBackground
                    : COLORS.negativeBackground,
              },
            ]}
          >
            <Text style={styles.percentChange}>
              {item.percentChange >= 0 ? STRINGS.positiveChangePrefix : ""}
              {item.percentChange.toFixed(2)}
              {STRINGS.percentSuffix}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>{STRINGS.highLabel}</Text>
            <Text style={styles.statValue}>
              {item.high?.toFixed(2) ?? STRINGS.placeholder}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>{STRINGS.lowLabel}</Text>
            <Text style={styles.statValue}>
              {item.low?.toFixed(2) ?? STRINGS.placeholder}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>{STRINGS.volLabel}</Text>
            <Text style={styles.statValue}>
              {item.volume
                ? item.volume > 1000000
                  ? `${(item.volume / 1000000).toFixed(2)}${STRINGS.millionSuffix}`
                  : item.volume > 1000
                    ? `${(item.volume / 1000).toFixed(2)}${STRINGS.thousandSuffix}`
                    : item.volume.toFixed(2)
                : STRINGS.placeholder}
            </Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>{STRINGS.quoteVolLabel}</Text>
            <Text style={styles.statValue}>
              {item.quoteVolume
                ? item.quoteVolume > 1000000
                  ? `${(item.quoteVolume / 1000000).toFixed(2)}${STRINGS.millionSuffix}`
                  : item.quoteVolume > 1000
                    ? `${(item.quoteVolume / 1000).toFixed(2)}${STRINGS.thousandSuffix}`
                    : item.quoteVolume.toFixed(2)
                : STRINGS.placeholder}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>{STRINGS.tradesLabel}</Text>
            <Text style={styles.statValue}>
              {item.trades?.toLocaleString() ?? STRINGS.placeholder}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>{STRINGS.changeLabel}</Text>
            <Text
              style={{
                ...styles.statValue,
                color:
                  item.priceChange >= 0
                    ? COLORS.positiveText
                    : COLORS.negativeText,
              }}
            >
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
    flexDirection: "column",
    marginBottom: 12,
    marginHorizontal: 16,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  mainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.white,
    width: "100%",
    zIndex: 1,
  },
  leftContainer: {
    flexDirection: "column",
    gap: 4,
  },
  symbol: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.textPrimary,
    letterSpacing: 0.5,
  },
  price: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.textSecondary,
    letterSpacing: -0.5,
  },
  rightContainer: {
    alignItems: "flex-end",
  },
  changePill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    overflow: "hidden",
  },
  percentChange: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.white,
  },
  statsContainer: {
    width: "100%",
    backgroundColor: COLORS.backgroundLight,
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  statItem: {
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textLabel,
    marginBottom: 4,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textValue,
  },
});

export default TickerItem;
