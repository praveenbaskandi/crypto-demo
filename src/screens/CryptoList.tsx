import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StatusBar, Text, View } from "react-native";
import TickerItem from "../components/TickerItem";
import { COLORS } from "../constants/color";
import { STRINGS } from "../constants/string";
import { Ticker } from "../redux/types";
import { styles } from "./CryptoList.styles";
import { useCryptoList } from "./useCryptoList";

const CryptoList = () => {
  const { tickerList, connectionStatus } = useCryptoList();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>{STRINGS.cryptoTrackerTitle}</Text>
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusIndicator,
              {
                backgroundColor:
                  connectionStatus === "connected"
                    ? COLORS.statusConnected
                    : connectionStatus === "connecting"
                      ? COLORS.statusConnecting
                      : COLORS.statusDisconnected,
              },
            ]}
          />
          <Text style={styles.statusText}>
            {connectionStatus.charAt(0).toUpperCase() +
              connectionStatus.slice(1)}
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlashList
          data={tickerList}
          renderItem={({ item }: { item: Ticker }) => (
            <TickerItem item={item} />
          )}
          // @ts-ignore
          estimatedItemSize={120}
          keyExtractor={(item) => item.symbol}
        />
      </View>
    </View>
  );
};

export default CryptoList;
