import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { TabBarIcon, TabBar } from "@components";
import { SCREENS } from "@constants";

import Live from "../screens/live";
import LiveFilterSetting from "../screens/live/live-filter-setting";
import CountrySelection from "../screens/country-selection";
import LiveStream from "../screens/live-stream";
import Swipe from "../screens/swipe";
import Chat from "../screens/chat";
import Inbox from "../screens/inbox";
import ProfileSettings from "../screens/profile-settings";
import OrderImages from "../screens/profile-images-reorder";
import SearchScreen from "../screens/search";
import ProfileView from "../screens/profile-view";
import Settings from "../screens/settings";
import SwipeSettings from "../screens/settings/swipe-settings";
import AccountSettings from "../screens/settings/account-settings";
import SafetyPrivacy from "../screens/settings/safety-privacy";
import TermsOfService from "../screens/settings/terms-of-service";
import UpdatePhoneVerification from "../screens/settings/account-settings/update-phone-verification";
import LikeUsersScreen from "../screens/like-users";

import navigationConfig from "./navigation-config";
import PushNotificationSettings from "../screens/settings/push-notification-settings";

const InboxStack = createStackNavigator(
  {
    [SCREENS.INBOX]: Inbox,
    [SCREENS.LIKE_USERS]: LikeUsersScreen,
  },
  {
    initialRouteName: SCREENS.INBOX,
    headerMode: "none",
    mode: "card",
    defaultNavigationOptions: {
      ...navigationConfig,
    },
  },
);

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
      screen: InboxStack,
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
    [SCREENS.LIVE_FILTER_SETTING]: {
      screen: LiveFilterSetting,
      navigationOptions: {
        gestureEnabled: false,
        cardStyle: {
          backgroundColor: "transparent",
        },
      },
    },
    [SCREENS.COUNTRY_SELECTION]: CountrySelection,
    [SCREENS.CHAT]: Chat,
    [SCREENS.SEARCH]: SearchScreen,
    [SCREENS.PROFILE_VIEW]: {
      screen: ProfileView,
      navigationOptions: {
        gestureEnabled: false,
        cardStyle: {
          backgroundColor: "transparent",
        },
      },
    },

    [SCREENS.IMAGES_REORDER]: OrderImages,

    // Settings
    [SCREENS.SETTINGS]: Settings,
    [SCREENS.SWIPE_SETTINGS]: {
      screen: SwipeSettings,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    [SCREENS.ACCOUNT_SETTINGS]: AccountSettings,
    [SCREENS.PUSH_SETTINGS]: PushNotificationSettings,
    [SCREENS.SAFETY_PRIVACY]: SafetyPrivacy,
    [SCREENS.TERMS_OF_SERVICE]: TermsOfService,
    [SCREENS.UPDATE_PHONE_VERIFICATION]: UpdatePhoneVerification,
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
