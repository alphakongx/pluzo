import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { AuthStack } from "../navigation/auth-navigator";
import { HomeStack } from "../navigation/home-navigator";
import { SCREENS } from "@constants";

const RootStack = createSwitchNavigator(
  {
    [SCREENS.AUTHSTACK]: AuthStack,
    [SCREENS.HOMESTACK]: HomeStack,
  },
  {
    initialRouteName: SCREENS.AUTHSTACK,
    navigationOptions: {
      header: "none",
    },
  },
);

const AppContainer = createAppContainer(RootStack);

export { AppContainer };
