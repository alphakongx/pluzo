import { NavigationActions, StackActions } from "react-navigation";

let _navigator = null;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  if (_navigator === null || !routeName) return;
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
