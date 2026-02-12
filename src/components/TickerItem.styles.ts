import { StyleSheet } from "react-native";
import { COLORS } from "../constants/color";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginBottom: 12,
    marginHorizontal: 16,
    backgroundColor: COLORS.white,
    borderRadius: 15,
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
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  logoContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.backgroundLight,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  logo: {
    fontSize: 24,
    textAlign: "center",
  },
  nameAndPriceContainer: {
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
