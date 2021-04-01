import React, { useEffect, useState } from "react";
import { Platform, SafeAreaView, View } from "react-native";
import { Screen, Text, Image, Touchable } from "@components";
import { Switch } from "react-native-switch";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { request, checkMultiple, PERMISSIONS, RESULTS, openSettings} from 'react-native-permissions';
import Images from "@assets/Images";

import Header from "../../header";
import styles from "./location-permission.style";

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: true,
};

const LocationPermissionScreen: () => React$Node = props => {
  const [locationEnabled, setLocationEnabled] = useState(null);
  const [hideLocation, setHideLocation] = useState(props.user.hide_location === 0 ? false : true);
  const [hideCity, setHideCity] = useState(props.user.hide_city === 0 ? false : true);
  const { updateUser, token } = props;

  useEffect(() => {
    return () => {
      const params = new FormData();
      params.append("hide_location", hideLocation ? 1 : 0);
      params.append("hide_city", hideCity ? 1 : 0);
      updateUser(params, token);
    }
  }, [updateUser, token, hideLocation, hideCity]);

  useEffect(() => {
    let arrPermissions = [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE];
    if (Platform.OS === "android") {
      arrPermissions = [PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION];
    }
    checkMultiple(arrPermissions).then((statuses) => {
      if (Platform.OS === "ios") {
        if (statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.GRANTED) {
          setLocationEnabled("Enabled");
        } else if (statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.BLOCKED) {
          setLocationEnabled("Disabled");
        } else {
          setLocationEnabled("Not Requested");
        }
      } else {
        if (statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED) {
          setLocationEnabled("Enabled");
        } else {
          setLocationEnabled("Disabled");
        }
      }      
    }).catch(e => {
      console.log("Error on checking location", e);
    });
  }, []);

  const renderItem = (title, text, hint) => {
    return (
      <View style={styles.itemPadding}>
        <View style={styles.flexRow}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.valueText}>{text}</Text>
          <Image source={Images.app.icRight} style={styles.arrowIcon} />
        </View>
        {hint !== null && <Text style={styles.hintText}>{hint}</Text>}
      </View>
    );
  };

  return (
    <Screen hasGradient style={styles.flexFill}>
      <SafeAreaView style={styles.flexFill}>
        <View style={styles.flexFill}>
          <Header title={"Location"} onBack={props.navigation.goBack} />

          <Touchable onPress={() => {
            if (locationEnabled === "Not Requested") {
              request(Platform.OS === "ios" ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
                if (result === RESULTS.GRANTED) {
                  setLocationEnabled("Enabled");
                } else {
                  setLocationEnabled("Disabled");
                }
              });
            } else {
              openSettings().catch(() => console.warn('cannot open settings'));
            }
          }}>
            {renderItem("Manage location access", locationEnabled, null)}
          </Touchable>
          <View style={styles.seperator} />

          <View style={[styles.flexRow, styles.itemPadding]}>
            <Text style={styles.titleText}>Hide Location</Text>
            <Switch
              value={hideLocation}
              onValueChange={val => {
                setHideLocation(val);
                ReactNativeHapticFeedback.trigger("impactLight", options);
              }}
              circleSize={20}
              barHeight={24}
              circleBorderWidth={0}
              backgroundActive={"#617FFF"}
              backgroundInactive={"#ABA7D5"}
              circleActiveColor={"white"}
              circleInActiveColor={"white"}
              renderActiveText={false}
              renderInActiveText={false}
              switchBorderRadius={12}
              switchWidthMultiplier={2.2}
            />
          </View>
          <View style={styles.seperator} />

          <View style={[styles.flexRow, styles.itemPadding]}>
            <Text style={styles.titleText}>Hide City</Text>
            <Switch
              value={hideCity}
              onValueChange={val => {
                setHideCity(val);
                ReactNativeHapticFeedback.trigger("impactLight", options);
              }}
              circleSize={20}
              barHeight={24}
              circleBorderWidth={0}
              backgroundActive={"#617FFF"}
              backgroundInactive={"#ABA7D5"}
              circleActiveColor={"white"}
              circleInActiveColor={"white"}
              renderActiveText={false}
              renderInActiveText={false}
              switchBorderRadius={12}
              switchWidthMultiplier={2.2}
            />
          </View>
          <View style={styles.seperator} />
        </View>
      </SafeAreaView>
    </Screen>
  );
};

export default LocationPermissionScreen;
