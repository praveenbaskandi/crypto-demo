import { useEffect, useRef } from "react";
import {
  SharedValue,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { COLORS } from "../constants/color";

export const useTickerAnimation = (
  price: number,
): { backgroundColor: SharedValue<string> } => {
  const prevPriceRef = useRef<number>(price);
  const backgroundColor = useSharedValue<string>(COLORS.transparent);

  useEffect(() => {
    if (price > prevPriceRef.current) {
      // Price increased - Flash Green
      backgroundColor.value = withSequence(
        withTiming(COLORS.flashGreen, { duration: 100 }),
        withTiming(COLORS.transparent, { duration: 300 }),
      );
    } else if (price < prevPriceRef.current) {
      // Price decreased - Flash Red
      backgroundColor.value = withSequence(
        withTiming(COLORS.flashRed, { duration: 100 }),
        withTiming(COLORS.transparent, { duration: 300 }),
      );
    }
    prevPriceRef.current = price;
  }, [price, backgroundColor]);

  return { backgroundColor };
};
