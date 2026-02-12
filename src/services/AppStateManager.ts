import { AppState, AppStateStatus } from "react-native";
import { webSocketClient } from "../network/WebSocketClient";

class AppStateManager {
  private lastAppState: AppStateStatus = AppState.currentState;

  init() {
    const subscription = AppState.addEventListener(
      "change",
      this.handleAppStateChange,
    );
    return () => {
      subscription.remove();
    };
  }

  private handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (
      this.lastAppState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
      webSocketClient.connect();
    } else if (nextAppState.match(/inactive|background/)) {
      console.log("App going to background");
      webSocketClient.disconnect();
    }

    this.lastAppState = nextAppState;
  };
}

export const appStateManager = new AppStateManager();
