import { NavigationActions, StackActions } from "react-navigation";

let _navigator = null;

function isNavigator() {
  return _navigator !== null;
}

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  if (_navigator === null || !routeName) return false;
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
  return true;
}

function popToTop(routeName, params) {
  _navigator.dispatch(StackActions.popToTop());
}

function getCurrentRoute(nav){
  if (nav === null) {
    nav = _navigator.state.nav;
  }
  if(Array.isArray(nav.routes)&&nav.routes.length>0){
      return getCurrentRoute(nav.routes[nav.index])
  }else {
      return nav.routeName
  }
}

export const NavigationService = {
  popToTop,
  navigate,
  setTopLevelNavigator,
  isNavigator,
  getCurrentRoute,
};
