import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { SafeAreaView } from "react-navigation";
import { 
  Touchable,
  Image,
  Text,
  DialogInput,
  TouchableSettingItem
} from "@components";
import { SCREENS } from "@constants";
import { Notification } from "@helpers";
import Images from "@assets/Images";
import Header from "./header";

import styles from "./settings.style";

// type: normal => 0, transparent => 1, empty cell => 2, separator-line => 3
const settingData = require("./settings.json");

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDelete: false,
    }
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  logout = () => {
    this.props.logout();
  };

  onDeleteAccount = (inputValue) => {
    this.setState({showDelete: false}, () => {
      setTimeout(() => {
        if (inputValue === "DELETE") {
          this.props.deleteAccount(this.props.token);
        } else {
          Notification.alert("Whoops", "Sorry, please enter the text exactly as displayed to confirm.");
        }
      }, 200);
    });
  }

  onItemPressed = itemId => {
    if (itemId === "5") {
      this.props.navigation.navigate(SCREENS.SWIPE_SETTINGS);
    } else if (itemId === "16") {   // delete account
      if (!this.props.isDeletingAccount) {
        this.setState({showDelete: true});
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeAreaContainer}>
          <Header title={"Settings"} onBack={this.goBack} />

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
                      iconUri={Images.settings[item.iconUri]}
                      onPress={() => this.onItemPressed(item.id)}
                    />
                  );
                case 1:
                  if (item.name.toLowerCase() === "logout") {
                    return (
                      <Touchable style={styles.itemContainer1} onPress={this.logout}>
                        <Image source={Images.settings[item.iconUri]} />
                        <Text style={styles.logoutText}>{item.name}</Text>
                      </Touchable>
                    );
                  } else {
                    return (
                      <Touchable style={styles.itemContainer1}
                        onPress={() => this.onItemPressed(item.id)}>
                        <Image source={Images.settings[item.iconUri]} />
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
        <DialogInput isDialogVisible={this.state.showDelete}
          title={"Delete your account?"}
          message={"Please type \"DELETE\" to confirm"}
          hintInput={"DELETE"}
          submitText={"Delete my account"}
          textInputProps={{autoCapitalize: "characters"}}
          submitInput={ (inputText) => this.onDeleteAccount(inputText)}
          closeDialog={ () => {this.setState({showDelete: false})}}>

        </DialogInput>
      </View>
    );
  }
}

export default Settings;
