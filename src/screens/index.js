import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { AuthStack } from "../navigation/auth-navigator";
import { HomeNavigator } from "../navigation/home-navigator";
import { SCREENS } from "@constants";

const RootStack = createSwitchNavigator(
  {
    [SCREENS.LOGIN]: AuthStack,
  },
  {
    navigationOptions: {
      header: "none",
    },
  },
);

const AppContainer = createAppContainer(RootStack);

export { AppContainer };
