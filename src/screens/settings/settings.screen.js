import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Touchable, Image, Text, TouchableSettingItem } from "@components";
import Images from "@assets/Images";

import styles from "./settings.style";

// type: normal => 0, transparent => 1, empty cell => 2, separator-line => 3
const settingData = [
  { id: "1", name: "Account", iconUri: Images.settings.icAccount, type: 0 },
  { id: "2", name: "Safety and Privacy", iconUri: Images.settings.icSafety, type: 0 },
  { id: "3", name: "Push Notifications", iconUri: Images.settings.icPush, type: 0 },
  { id: "4", type: 2 },
  { id: "5", name: "Swipe Settings", iconUri: Images.settings.icSwipe, type: 0 },
  { id: "6", type: 2 },
  { id: "7", name: "Help", iconUri: Images.settings.icHelp, type: 0 },
  {
    id: "8",
    name: "Community Guidelines",
    iconUri: Images.settings.icCommunity,
    type: 0,
  },
  { id: "9", name: "Legal", iconUri: Images.settings.icLegal, type: 0 },
  { id: "10", type: 2 },
  { id: "11", name: "Restore Purchases", iconUri: Images.settings.icRestore, type: 0 },
  { id: "12", type: 2 },
  { id: "13", type: 3 },
  { id: "14", type: 2 },
  { id: "15", name: "Logout", iconUri: Images.settings.icLogout, type: 1 },
  { id: "16", name: "Delete Account", iconUri: Images.settings.icTrash, type: 1 },
  { id: "17", type: 2 },
];

class Settings extends Component {
  goBack = () => {
    this.props.navigation.goBack();
  };

  logout = () => {
    this.props.logout();
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={styles.headerContainer}>
            <Touchable style={styles.backButton} onPress={this.goBack}>
              <Image source={Images.app.icBackLeft} style={styles.backButtonIcon} />
            </Touchable>
          </View>

          <Text style={styles.settingText}>{"Settings"}</Text>

          <FlatList
            data={settingData}
            keyExtractor={item => item.id}
            renderItem={({ item: item, index }) => {
              switch (item.type) {
                case 0:
                  return (
                    <TouchableSettingItem
                      style={styles.itemContainer}
                      text={item.name}
                      icon
                      iconUri={item.iconUri}
                    />
                  );
                case 1:
                  if (item.name.toLowerCase() === "logout") {
                    return (
                      <Touchable style={styles.itemContainer1} onPress={this.logout}>
                        <Image source={item.iconUri} />
                        <Text style={styles.logoutText}>{item.name}</Text>
                      </Touchable>
                    );
                  } else {
                    return (
                      <Touchable style={styles.itemContainer1}>
                        <Image source={item.iconUri} />
                        <Text style={styles.deleteText}>{item.name}</Text>
                      </Touchable>
                    );
                  }
                case 2:
                  return <View style={styles.emptyItemContainer} />;
                case 3:
                  return <View style={styles.separatorLine} />;
              }
            }}
          />
        </SafeAreaView>
      </View>
    );
  }
}

export default Settings;
