import { NavigationActions, StackActions } from "react-navigation";

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function popToTop(routeName, params) {
  _navigator.dispatch(StackActions.popToTop());
}

export const NavigationService = {
  popToTop,
  navigate,
  setTopLevelNavigator,
};
