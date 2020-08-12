import React from "react";
import { View, ScrollView, ActivityIndicator, TextInput, } from "react-native";
import ImagePicker from "react-native-image-picker";
import EventBus from "eventing-bus";
import { UserTypes } from "@redux/actions";
import { SCREENS } from "@constants";

import {
  Screen,
  SolidButton,
  Text,
  Image,
  Touchable,
  TouchableSettingItem,
  GradientButton,
  BoxShadow,
} from "@components";
import { Notification } from "@helpers";
import Images from "@assets/Images";
import { GRADIENT } from "@config";

import Header from "./header";
import UserProfile from "./user-profile";
import PurchaseModal from "./purchase-modal";
import ChooseBadgeModal from "./choose-badge-modal";
import styles, { width } from "./profile-settings.style";

class ProfileSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      visibleChooseBadge: false,
      avatarUploading: false,
      uploading: false,
      bioText: this.props.user.bio || "",
    };
  }

  componentDidMount() {
    this.updateSuccessAction = EventBus.on(
      UserTypes.UPDATE_USER_SUCCESS,
      this.uploadingDone,
    );
    this.updateFailureAction = EventBus.on(
      UserTypes.UPDATE_USER_FAILURE,
      this.uploadingDone,
    );
    console.log(this.props.user);
  }

  componentWillUnmount() {
    this.updateSuccessAction();
    this.updateFailureAction();
  }

  uploadingDone = () => {
    this.setState({ uploading: false, avatarUploading: false });
  };

  onProfileClick = () => {
    this.props.navigation.navigate(SCREENS.PROFILE_VIEW, { user: this.props.user });
  };

  onAddImage = () => {
    this.onSelectImage("images");
  };

  onSelectImage = type => {
    const options = {
      title: "Select Image",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        let photoUriSplit = response.uri.split("/");

        const image = {
          uri: response.uri,
          name: photoUriSplit[photoUriSplit.length - 1],
          type: response.type,
        };
        if (type === "avatar") {
          this.setState({ avatarUploading: true }, () => {
            const params = new FormData();
            params.append("image", image);
            this.props.updateUser(params, this.props.token);
          });
        } else {
          this.setState({ uploading: true }, () => {
            const params = new FormData();
            params.append("images[]", image);
            this.props.updateUser(params, this.props.token);
          });
        }
      }
    });
  };

  onDeleteImage = imageId => {
    if (this.props.user.images.length === 1) return;
    Notification.confirmAlert("Delete", "Do you want to delete this image?", () => {
      this.props.deleteImage(imageId, this.props.token);
    });
  };

  render() {
    const { user, deletingImageId } = this.props;
    const { uploading, avatarUploading } = this.state;

    let reverseImages = [...user.images];
    reverseImages.sort((a, b) => a.sort < b.sort);

    return (
      <Screen>
        <ScrollView style={styles.container} bounces={false}>
          <Header navigation={this.props.navigation} />
          <UserProfile
            user={user}
            loading={avatarUploading}
            onAvatarClick={this.onProfileClick}
            onNameClick={this.onProfileClick}
          />
          <View style={styles.chooseBadgeButton}>
            <SolidButton
              text={"Choose Badges"}
              onPress={() => this.setState({ visibleChooseBadge: true })}
            />
          </View>
          <View style={styles.imageContainer}>
            <Text style={styles.sectionText}>Images</Text>
            <ScrollView horizontal style={styles.imageScrollView}>
              <Touchable disabled={uploading} onPress={() => this.onAddImage()}>
                <View style={styles.addImageButton}>
                  {uploading ? (
                    <ActivityIndicator size={"small"} color={"white"} />
                  ) : (
                    <Image source={Images.live.plusFav} />
                  )}
                </View>
              </Touchable>
              {reverseImages.map((image, index) => {
                  return (
                    <Touchable
                      key={index}
                      style={styles.imageItem}
                      onPress={() => {
                        this.props.navigation.navigate(SCREENS.IMAGES_REORDER, {});
                      }}
                      onLongPress={() => this.onDeleteImage(image.id)}
                    >
                      <Image source={{ uri: image.path }} style={styles.profileImage} />
                      {deletingImageId === image.id && (
                        <View style={styles.imageLoadingContainer}>
                          <ActivityIndicator size={"small"} color={"white"} />
                        </View>
                      )}
                    </Touchable>
                  );
                })}
            </ScrollView>
          </View>

          <View style={styles.settingsContainer}>
            <Text style={styles.settingsText}>About Me</Text>
            <View style={styles.bioContainer}>
              <TextInput
                style={styles.bigTextInput}
                multiline
                maxLength={200}
                placeholder={"Bio"}
                placeholderTextColor={"#E8E6FF"}
                selectionColor={"white"}
                value={this.state.bioText}
                onChangeText={text => this.setState({ bioText: text })}
                onEndEditing={() => {
                  const params = new FormData();
                  params.append("bio", this.state.bioText);
                  this.props.updateUser(params, this.props.token);
                }}
              />
            </View>
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
              <View>
                <BoxShadow setting={{
                  width: width - 40,
                  height: ((width - 40) * 169) / 336,
                  color: "#FF0000",
                  opacity: 0.15,
                  _borderRadius: 22,
                  spread: 0,
                  blur: 40,
                  offsetX: 0,
                  offsetY: 0,
                }}/>
                <Image source={Images.app.pluzoPlus} style={styles.premiumImage} />
              </View>
              <View style={styles.buttonContainer}>
                <GradientButton
                  text={"Get Pluzo Plus"}
                  colors={GRADIENT.PURCHASE_BUTTON}
                  shadowColor={"#FF6F00"}
                  onPress={() => this.setState({ visible: true })}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <PurchaseModal
          isVisible={this.state.visible}
          onSwipeComplete={() => this.setState({ visible: false })}
        />

        <ChooseBadgeModal
          isVisible={this.state.visibleChooseBadge}
          dismissModal={() => this.setState({ visibleChooseBadge: false })}
        />
      </Screen>
    );
  }
}

export default ProfileSettings;
