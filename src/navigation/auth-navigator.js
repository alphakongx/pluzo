import { createStackNavigator } from "react-navigation-stack";
import Login from "../screens/login";
import SignupFirstName from "../screens/signup-first-name";
import SignupGenderSelect from "../screens/signup-gender-select";
import SignupUsername from "../screens/signup-username";
import SignupImage from "../screens/signup-image";
import SignupPhoneNumber from "../screens/signup-phone-number";
import SignupCodeVerification from "../screens/signup-code-verification";
import SignupSuccess from "../screens/signup-success";
import navigationConfig from "./navigation-config";

const AuthStack = createStackNavigator(
  {
    LOGIN: { screen: Login },
    SIGNUP_FIRST_NAME: { screen: SignupFirstName },
    SIGNUP_GENDER_SELECT: { screen: SignupGenderSelect },
    SIGNUP_USERNAME: { screen: SignupUsername },
    SIGNUP_IMAGE: { screen: SignupImage },
    SIGNUP_PHONE_NUMBER: { screen: SignupPhoneNumber },
    SIGNUP_CODE_VERIFICATION: { screen: SignupCodeVerification },
    SIGNUP_SUCCESS: { screen: SignupSuccess },
  },
  {
    initialRouteName: "SIGNUP_FIRST_NAME",
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
