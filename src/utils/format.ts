import { COLORS } from "../constants/color";
import { STRINGS } from "../constants/string";

export const formatPrice = (price: number): string => {
  return `${STRINGS.pricePrefix}${price.toFixed(2)}`;
};

export const formatPercentChange = (percentChange: number): string => {
  const prefix = percentChange >= 0 ? STRINGS.positiveChangePrefix : "";
  return `${prefix}${percentChange.toFixed(2)}${STRINGS.percentSuffix}`;
};

export const formatVolume = (volume?: number): string => {
  if (!volume) return STRINGS.placeholder;

  if (volume > 1000000) {
    return `${(volume / 1000000).toFixed(2)}${STRINGS.millionSuffix}`;
  } else if (volume > 1000) {
    return `${(volume / 1000).toFixed(2)}${STRINGS.thousandSuffix}`;
  }
  return volume.toFixed(2);
};

export const formatStatValue = (value?: number): string => {
  return value?.toFixed(2) ?? STRINGS.placeholder;
};

export const formatTrades = (trades?: number): string => {
  return trades?.toLocaleString() ?? STRINGS.placeholder;
};

export const formatChange = (change?: number): string => {
  return change?.toFixed(2) ?? STRINGS.placeholder;
};

export const getChangeColor = (
  value: number,
  type: "background" | "text",
): string => {
  if (type === "background") {
    return value >= 0 ? COLORS.positiveBackground : COLORS.negativeBackground;
  }
  return value >= 0 ? COLORS.positiveText : COLORS.negativeText;
};
