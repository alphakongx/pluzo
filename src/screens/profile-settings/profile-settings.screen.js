import React from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import ImagePicker from "react-native-image-picker";
import EventBus from "eventing-bus";
import { UserTypes } from "@redux/actions";

import {
  Screen,
  SolidButton,
  Text,
  Image,
  Touchable,
  TouchableSettingItem,
  GradientButton,
} from "@components";
import { Notification } from "@helpers";
import Images from "@assets/Images";
import { GRADIENT } from "@config";

import Header from "./header";
import UserProfile from "./user-profile";
import PurchaseModal from "./purchase-modal";
import ChooseBadgeModal from "./choose-badge-modal";
import styles from "./profile-settings.style";

class ProfileSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      visibleChooseBadge: false,
      avatarUploading: false,
      uploading: false,
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

  onAvatarClick = () => {
    this.onSelectImage("avatar");
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
            this.props.uploadImage(params, this.props.token);
          });
        } else {
          this.setState({ uploading: true }, () => {
            const params = new FormData();
            params.append("images[]", image);
            this.props.uploadImage(params, this.props.token);
          });
        }
      }
    });
  };

  onDeleteImage = imageId => {
    Notification.confirmAlert("Delete", "Do you want to delete this image?", () => {
      this.props.deleteImage(imageId, this.props.token);
    });
  };

  render() {
    const { user, deletingImageId } = this.props;
    const { uploading, avatarUploading } = this.state;

    return (
      <Screen>
        <ScrollView style={styles.container}>
          <Header navigation={this.props.navigation} />
          <UserProfile
            user={user}
            loading={avatarUploading}
            onAvatarClick={this.onAvatarClick}
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
              {user !== null &&
                user.images.map((image, index) => {
                  return (
                    <Touchable
                      key={index}
                      style={styles.imageItem}
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
              <Touchable disabled={uploading} onPress={() => this.onAddImage()}>
                <View style={styles.addImageButton}>
                  {uploading ? (
                    <ActivityIndicator size={"small"} color={"white"} />
                  ) : (
                    <Image source={Images.live.plusFav} />
                  )}
                </View>
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
