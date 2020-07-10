import React from "react";
import { View, ScrollView } from "react-native";
import {
  Screen,
  SolidButton,
  Text,
  Image,
  Touchable,
  TouchableSettingItem,
  GradientButton,
} from "@components";
import Images from "@assets/Images";
import { GRADIENT } from "@config";
import Header from "./header";
import UserProfile from "./user-profile";
import styles from "./profile-settings.style";

class ProfileSettings extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var imageData = [
      { id: "1", url: require("@assets/images/live-screen/user-temp3.png") },
      { id: "2", url: require("@assets/images/live-screen/user-temp3.png") },
    ];
    return (
      <Screen>
        <ScrollView style={styles.container}>
          <Header navigation={this.props.navigation} />
          <UserProfile />
          <View style={styles.chooseBadgeButton}>
            <SolidButton text={"Choose Badges"} />
          </View>
          <View style={styles.imageContainer}>
            <Text style={styles.sectionText}>Images</Text>
            <ScrollView horizontal style={styles.imageScrollView}>
              {imageData.map((image, index) => {
                return (
                  <Image key={index} source={image.url} style={styles.profileImage} />
                );
              })}
              <Touchable style={styles.addImageButton}>
                <Image source={Images.live.plusFav} />
              </Touchable>
            </ScrollView>
          </View>

          <View style={styles.settingsContainer}>
            <Text style={styles.settingsText}>Profile Settings</Text>
            <View style={styles.separatorLine} />
            <TouchableSettingItem style={styles.settingsItem} text={"All Badges"} />
            <View style={styles.separatorLine} />
            <TouchableSettingItem
              style={styles.settingsItem}
              text={"Get verified"}
              verifyBadge
            />
            <View style={styles.separatorLine} />
            <TouchableSettingItem style={styles.settingsItem} text={"Biography"} />

            <View style={styles.plusContainer}>
              <Image source={Images.app.pluzoPlus} style={styles.premiumImage} />
              <View style={styles.buttonContainer}>
                <GradientButton
                  text={"Get Pluzo Plus"}
                  colors={GRADIENT.PURCHASE_BUTTON}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </Screen>
    );
  }
}

export default ProfileSettings;
