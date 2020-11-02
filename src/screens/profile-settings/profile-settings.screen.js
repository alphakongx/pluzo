import React from "react";
import { View, ScrollView, ActivityIndicator, TextInput, Animated } from "react-native";
import FastImage from "react-native-fast-image";
import ImagePicker from "react-native-image-crop-picker";
import ActionSheet from "react-native-actionsheet";
import EventBus from "eventing-bus";
import { UserTypes } from "@redux/actions";
import { SCREENS } from "@constants";

import {
  Screen,
  SolidButton,
  Text,
  Image,
  Touchable,
  GradientButton,
  BoxShadow,
  SortableList,
} from "@components";
import { Notification, widthPercentageToDP as wp } from "@helpers";
import Images from "@assets/Images";
import { GRADIENT } from "@config";

import Header from "./header";
import UserProfile from "./user-profile";
import ProfileAmounts from "./profile-amounts";
import PurchaseModal from "./purchase-modal";
import ChooseBadgeModal from "./choose-badge-modal";
import FriendsModal from "./friends-modal";
import SwipePurchaseModal from "../swipe/swipe-purchase-modal";
import styles, { width } from "./profile-settings.style";

class ProfileSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visiblePurchase: false,
      visibleChooseBadge: false,
      visibleBoost: false,
      visibleSuperlike: false,
      visibleRewind: false,
      avatarUploading: false,
      uploading: false,
      bioText: this.props.user.bio || "",
      editingImage: false,
    };
    this.ActionSheet = React.createRef();
    this.rotateValue = new Animated.Value(0);
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
    this._unsubscribe = this.props.navigation.addListener("willFocus", () => {
      this.props.requestProfile(this.props.token);
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.user.images.length !== this.props.user.images.length &&
      this.props.user.images.length === 1
    ) {
      this.onEditingImageDone();
    }
  }

  startAnimation = () => {
    if (!this.state.editingImage) return;
    Animated.timing(this.rotateValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(this.rotateValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        this.startAnimation();
      });
    });
  };

  componentWillUnmount() {
    this.updateSuccessAction();
    this.updateFailureAction();
    this._unsubscribe;
  }

  uploadingDone = () => {
    this.setState({ uploading: false, avatarUploading: false });
  };

  onProfileClick = () => {
    this.props.navigation.navigate(SCREENS.PROFILE_VIEW, { user: this.props.user });
  };

  onAddImage = () => {
    this.setState({ editingImage: false });
    this.ActionSheet.show();
  };

  onSelectImage = index => {
    const options = {
      width: 600,
      height: 800,
      cropping: true,
      compressImageQuality: 0.7,
    };

    if (index === 0) {
      ImagePicker.openCamera(options).then(image => {
        this.onUploadImage(image);
      });
    } else if (index === 1) {
      ImagePicker.openPicker(options).then(image => {
        this.onUploadImage(image);
      });
    }
  };

  onUploadImage = data => {
    let photoUriSplit = data.path.split("/");

    const image = {
      uri: data.path,
      name: photoUriSplit[photoUriSplit.length - 1],
      type: data.mime,
    };
    this.setState({ uploading: true }, () => {
      const params = new FormData();
      params.append("images[]", image);
      this.props.updateUser(params, this.props.token);
    });
  };

  onDeleteImage = imageId => {
    if (this.props.user.images.length === 1) {
      this.setState({ editingImage: false });
      return;
    }
    if (
      this.props.user.images.length === 2 &&
      this.props.user.images.filter(image => image.id === this.props.deletingImageId)
        .length > 0
    ) {
      this.setState({ editingImage: false });
      return;
    }
    Notification.confirmAlert("Delete", "Do you want to delete this image?", "OK", () => {
      this.props.deleteImage(imageId, this.props.token);
    });
  };

  onEditingImage = () => {
    if (this.props.user.images.length === 1) return;
    this.setState({ editingImage: true }, () => {
      this.startAnimation();
    });
  };

  onEditingImageDone = () => {
    this.setState({ editingImage: false });
    if (this.state.uploading || this.nextImageOrder === undefined) return;
console.log(this.nextImageOrder);
    let reverseImages = [...this.props.user.images];
    reverseImages = reverseImages.sort((a, b) => a.sort > b.sort);

    if (reverseImages.length !== this.nextImageOrder.length) return;

    let sort = this.nextImageOrder.length;
    let params = new FormData();
    for (let i = this.nextImageOrder.length - 1; i >= 0; i--) {
      reverseImages[this.nextImageOrder[i]].sort = sort;
      params.append(
        `sort[${reverseImages[this.nextImageOrder[i]].id}]`,
        reverseImages[this.nextImageOrder[i]].sort,
      );
      sort--;
    }
    let user = this.props.user;
    user.images = reverseImages;
    this.props.updateUserImage(user);
    this.props.reorderImages(params, this.props.token);
  };

  _onChangeOrder = (key, currentOrder) => {
    console.log(currentOrder);
    this.nextImageOrder = currentOrder;
  };

  _renderImageHeader = () => {
    const { uploading } = this.state;
    return (
      <Touchable disabled={uploading} onPress={() => this.onAddImage()}>
        <View style={styles.addImageButton}>
          {uploading ? (
            <ActivityIndicator size={"small"} color={"white"} />
          ) : (
            <Image source={Images.app.icPlus} />
          )}
        </View>
      </Touchable>
    );
  };

  _renderImageRow = rowData => {
    const { deletingImageId } = this.props;
    const { editingImage } = this.state;
    const { data } = rowData;
    let rotation = this.rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["-2deg", "2deg"], // degree of rotation
    });
    let transformStyle = { transform: [{ rotate: rotation }] };

    return (
      <Touchable
        key={data.id}
        disabled={editingImage}
        style={styles.imageItem}
        onLongPress={() => this.onEditingImage()}
      >
        <Animated.View
          style={[styles.profileImageContainer, editingImage ? transformStyle : {}]}
        >
          <FastImage source={{ uri: data.path }} style={styles.profileImage} />
        </Animated.View>
        {deletingImageId === data.id && (
          <View style={styles.imageLoadingContainer}>
            <ActivityIndicator size={"small"} color={"white"} />
          </View>
        )}
        {editingImage && deletingImageId !== data.id && (
          <Touchable
            style={styles.imageDeleteContainer}
            onPress={() => this.onDeleteImage(data.id)}
          >
            <View style={styles.deleteButton} />
          </Touchable>
        )}
      </Touchable>
    );
  };

  render() {
    const { user, insets } = this.props;
    const { avatarUploading, editingImage } = this.state;

    let reverseImages = [...user.images];
    reverseImages = reverseImages.sort((a, b) => a.sort > b.sort);

    return (
      <Screen style={[styles.container, { marginBottom: insets.bottom + 50 }]}>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <Header navigation={this.props.navigation} />
          <UserProfile
            loading={avatarUploading}
            onAvatarClick={this.onProfileClick}
            onNameClick={this.onProfileClick}
            onFriends={() => this.setState({ visibleFriends: true })}
          />
          <View style={styles.badgeButtonContainer}>
            <SolidButton
              text={"Choose Badges"}
              textStyle={styles.chooseBadgeText}
              containerStyle={styles.chooseBadgeButton}
              onPress={() => this.setState({ visibleChooseBadge: true })}
            />
          </View>
          <View style={styles.imageContainer}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionText}>Images</Text>
              {editingImage && (
                <Touchable onPress={this.onEditingImageDone}>
                  <Text style={styles.sectionText}>Done</Text>
                </Touchable>
              )}
            </View>
            <SortableList
              horizontal
              sortingEnabled={editingImage}
              scrollEnabled={true}
              rowActivationTime={30}
              style={styles.imageScrollView}
              data={reverseImages}
              renderRow={this._renderImageRow}
              renderHeader={this._renderImageHeader}
              onReleaseRow={this._onChangeOrder}
              showsHorizontalScrollIndicator={false}
            />
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
                onChangeText={text => {
                  const lines = text.split("\n");
                  if (lines.length <= 4) {
                    this.setState({ bioText: text });
                  }
                }}
                onEndEditing={() => {
                  const params = new FormData();
                  params.append("bio", this.state.bioText);
                  this.props.updateUser(params, this.props.token);
                }}
              />
            </View>

            <View style={styles.plusContainer}>
              <View>
                <BoxShadow
                  setting={{
                    width: width - 40,
                    height: ((width - 40) * 169) / 336,
                    color: "#FF0000",
                    opacity: 0.15,
                    _borderRadius: 22,
                    spread: 0,
                    blur: 40,
                    offsetX: 0,
                    offsetY: 0,
                  }}
                />
                <Image source={Images.app.pluzoPlus} style={styles.premiumImage} />
              </View>
              <View style={styles.buttonContainer}>
                <GradientButton
                  text={"Get Pluzo Plus"}
                  colors={GRADIENT.PURCHASE_BUTTON}
                  shadowColor={"#FF6F00"}
                  onPress={() => this.setState({ visiblePurchase: true })}
                />
              </View>
            </View>

            <View style={styles.amountsContainer}>
              <ProfileAmounts
                tintColor={"#D491FF"}
                shadowColor={"#6E00FF"}
                barColors={["rgba(212, 145, 255, 0)", "rgba(212, 145, 255, 0.57)"]}
                barHeight={wp(123)}
                iconWidth={wp(27)}
                amounts={user.advanced ? user.advanced.boosts : 0}
                onPress={() => this.setState({ visibleBoost: true })}
              />
              <View style={styles.amountSpacer} />
              <ProfileAmounts
                tintColor={"#01C0FF"}
                shadowColor={"#0044FF"}
                barColors={["rgba(1, 192, 255, 0)", "rgba(1, 192, 255, 0.57)"]}
                barHeight={wp(142)}
                iconWidth={wp(27)}
                amounts={user.advanced ? user.advanced.super_likes : 0}
                icon={Images.app.icStar}
                onPress={() => this.setState({ visibleSuperlike: true })}
              />
              <View style={styles.amountSpacer} />
              <ProfileAmounts
                tintColor={"#FFA837"}
                shadowColor={"#FF0000"}
                barColors={["rgba(255, 168, 55, 0)", "rgba(255, 168, 55, 0.57)"]}
                barHeight={wp(123)}
                iconWidth={wp(35)}
                amounts={user.advanced ? user.advanced.reminds : 0}
                icon={Images.app.icRewind}
                onPress={() => this.setState({ visibleRewind: true })}
              />
            </View>
          </View>
        </ScrollView>

        <PurchaseModal
          isVisible={this.state.visiblePurchase}
          onSwipeComplete={() => this.setState({ visiblePurchase: false })}
        />

        <ChooseBadgeModal
          isVisible={this.state.visibleChooseBadge}
          dismissModal={() => this.setState({ visibleChooseBadge: false })}
        />

        <FriendsModal
          isVisible={this.state.visibleFriends}
          onSwipeComplete={() => this.setState({ visibleFriends: false })}
        />

        <SwipePurchaseModal
          isVisible={this.state.visibleBoost}
          uptoLogo
          onConfirm={() => this.setState({ visibleBoost: false })}
          onPluzoPlus={() => this.setState({ visibleBoost: false })}
          onHide={() => this.setState({ visibleBoost: false })}
        />

        <SwipePurchaseModal
          isVisible={this.state.visibleSuperlike}
          colors={["#0C0518", "#080A47", "#0032BB"]}
          mainLogo={Images.swipe.superLikeLogo}
          text={"Super Like"}
          confirmText={"Get Super Likes"}
          selectColors={["#01C0FF", "#0044FF"]}
          onConfirm={() => this.setState({ visibleSuperlike: false })}
          onPluzoPlus={() => this.setState({ visibleSuperlike: false })}
          onHide={() => this.setState({ visibleSuperlike: false })}
        />

        <SwipePurchaseModal
          isVisible={this.state.visibleRewind}
          colors={["#0C0518", "#320847", "#A10046"]}
          mainLogo={Images.swipe.rewindLogo}
          text={"Rewind"}
          confirmText={"Get Rewinds"}
          selectColors={["#FFA837", "#FF6600"]}
          onConfirm={() => this.setState({ visibleRewind: false })}
          onPluzoPlus={() => this.setState({ visibleRewind: false })}
          onHide={() => this.setState({ visibleRewind: false })}
        />

        <ActionSheet
          ref={o => (this.ActionSheet = o)}
          title={"Select Image"}
          options={["Take Photo...", "Choose from Library...", "Cancel"]}
          cancelButtonIndex={2}
          onPress={index => this.onSelectImage(index)}
        />
      </Screen>
    );
  }
}

export default ProfileSettings;
