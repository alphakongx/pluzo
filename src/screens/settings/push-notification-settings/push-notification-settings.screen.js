import React, { Component } from "react";
import { View, Dimensions, ActivityIndicator, SafeAreaView } from "react-native";
import { Screen, Image, Text, Touchable } from "@components";
import { Switch } from "react-native-switch";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import Images from "@assets/Images";
import Header from "../header";
import GenderModal from "../../swipe/no-users/gender-modal";
import { widthPercentageToDP as wp } from "@helpers";

import styles from "./push-notification-settings.style";

const screenWidth = Dimensions.get("window").width;

class PushNotificationSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newFriends: false,
      requestFriend: false,
      live: false,
      message: false,
    }
  }

  componentDidMount() {
    
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { newFriends, requestFriend, live, message } = this.state;
    return (
      <Screen
        hasGradient
        style={this.props.isModal ? styles.modalContainer : styles.container}
      >
        <SafeAreaView style={this.props.isModal ? {} : styles.safeAreaContainer}>
          <View>
            <Header title={"Push notifications"} onBack={this.goBack} />
            
            <View style={[styles.flexRow, styles.itemPadding]}>
              <Text style={styles.titleText}>New Friends</Text>
              <Switch
                value={newFriends}
                onValueChange={val => this.setState({ newFriends: val })}
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
            <View style={styles.separator} />

            <View style={[styles.flexRow, styles.itemPadding]}>
              <Text style={styles.titleText}>Friend request</Text>
              <Switch
                value={requestFriend}
                onValueChange={val => this.setState({ requestFriend: val })}
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
            <View style={styles.separator} />

            <View style={[styles.flexRow, styles.itemPadding]}>
              <Text style={styles.titleText}>Live</Text>
              <Switch
                value={live}
                onValueChange={val => this.setState({ live: val })}
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
            <View style={styles.separator} />

            <View style={[styles.flexRow, styles.itemPadding]}>
              <Text style={styles.titleText}>Message</Text>
              <Switch
                value={message}
                onValueChange={val => this.setState({ message: val })}
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
            <View style={styles.separator} />
          </View>
        </SafeAreaView>
      </Screen>
    );
  }
}

export default PushNotificationSettings;
