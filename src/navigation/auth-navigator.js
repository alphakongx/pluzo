import { createStackNavigator } from "react-navigation-stack";
import Login from "../screens/login";
import navigationConfig from "./navigation-config";

const AuthStack = createStackNavigator(
  {
    LOGIN: { screen: Login },
  },
  {
    initialRouteName: "LOGIN",
    headerMode: "none",
    defaultNavigationOptions: {
      cardStyle: {
        backgroundColor: "transparent",
      },
      ...navigationConfig,
    },
  },
);

AuthStack.navigationOptions = {
  cardStyle: {
    backgroundColor: "transparent",
  },
  ...navigationConfig,
};

export { AuthStack };
