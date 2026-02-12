import React from "react";
import { Text, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { STRINGS } from "../constants/string";
import { useTickerAnimation } from "../hooks/useTickerAnimation";
import { Ticker } from "../redux/types";
import { getCurrencyLogo, getCurrencyName } from "../utils/currency";
import {
  formatChange,
  formatPercentChange,
  formatPrice,
  formatStatValue,
  formatTrades,
  formatVolume,
  getChangeColor,
} from "../utils/format";
import { styles } from "./TickerItem.styles";

interface TickerItemProps {
  item: Ticker;
}

const TickerItem: React.FC<TickerItemProps> = React.memo(({ item }) => {
  const { backgroundColor } = useTickerAnimation(item.price);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: backgroundColor.value,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.mainRow}>
        <View style={styles.leftContainer}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>{getCurrencyLogo(item.symbol)}</Text>
          </View>
          <View style={styles.nameAndPriceContainer}>
            <Text style={styles.symbol}>{getCurrencyName(item.symbol)}</Text>
            <Text style={styles.price}>{formatPrice(item.price)}</Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <View
            style={[
              styles.changePill,
              {
                backgroundColor: getChangeColor(
                  item.percentChange,
                  "background",
                ),
              },
            ]}
          >
            <Text style={styles.percentChange}>
              {formatPercentChange(item.percentChange)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>{STRINGS.highLabel}</Text>
            <Text style={styles.statValue}>{formatStatValue(item.high)}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>{STRINGS.lowLabel}</Text>
            <Text style={styles.statValue}>{formatStatValue(item.low)}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>{STRINGS.volLabel}</Text>
            <Text style={styles.statValue}>{formatVolume(item.volume)}</Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>{STRINGS.quoteVolLabel}</Text>
            <Text style={styles.statValue}>
              {formatVolume(item.quoteVolume)}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>{STRINGS.tradesLabel}</Text>
            <Text style={styles.statValue}>{formatTrades(item.trades)}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>{STRINGS.changeLabel}</Text>
            <Text
              style={{
                ...styles.statValue,
                color: getChangeColor(item.priceChange, "text"),
              }}
            >
              {formatChange(item.priceChange)}
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
});

TickerItem.displayName = "TickerItem";

export default TickerItem;
