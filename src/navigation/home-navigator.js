import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { TabBarIcon, TabBar } from "@components";
import { SCREENS } from "@constants";

import Live from "../screens/live";
import LiveStream from "../screens/live-stream";
import Swipe from "../screens/swipe";
import Chat from "../screens/chat";
import Inbox from "../screens/inbox";
import ProfileSettings from "../screens/profile-settings";
import Settings from "../screens/settings";

import navigationConfig from "./navigation-config";

const TabStack = createBottomTabNavigator(
  {
    LIVE_TAB: {
      screen: Live,
      navigationOptions: {
        tabBarIcon: props => <TabBarIcon {...props} name='Live' />,
      },
    },
    SWIPE_TAB: {
      screen: Swipe,
      navigationOptions: {
        tabBarIcon: props => <TabBarIcon {...props} name='Swipe' />,
      },
    },
    INBOX_TAB: {
      screen: Inbox,
      navigationOptions: {
        tabBarIcon: props => <TabBarIcon {...props} name='Chat' />,
      },
    },
    PROFILE_TAB: {
      screen: ProfileSettings,
      navigationOptions: {
        tabBarIcon: props => <TabBarIcon {...props} name='Profile' />,
      },
    },
  },
  {
    tabBarComponent: TabBar,
    tabBarOptions: {
      activeTintColor: "red",
      inactiveTintColor: "grey",
      showLabel: false,
      labelStyle: {
        // fontFamily: "Lato-Bold",
        fontSize: 11,
      },
    },
  },
);

const HomeStack = createStackNavigator(
  {
    [SCREENS.MAIN]: TabStack,
    [SCREENS.LIVE_STREAM]: LiveStream,
    [SCREENS.SETTINGS]: Settings,
    [SCREENS.CHAT]: Chat,
  },
  {
    initialRouteName: SCREENS.MAIN,
    headerMode: "none",
    mode: "card",
    defaultNavigationOptions: {
      ...navigationConfig,
    },
  },
);

export { HomeStack };
