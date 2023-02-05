import React from "react";
import { View } from "react-native";
import { Text, Touchable, GradientButton } from "@components";
import FastImage from "react-native-fast-image";
import { GRADIENT } from "@config";
import Images from "@assets/Images";
import styles from "./modal-friend-item.style";

const ModalFriendItem: () => React$Node = props => {
  let picture =
    props.user.images !== null ? props.user.images[0].path : Images.app.userPlaceholder;
  let isJoined = false;
  let isInvited = props.invitedFriends.includes(props.user.id);
  let broadcasters = props.broadcasters.filter(
    value => value._id === parseInt(props.user.id, 10),
  );
  let audiences = props.audiences.filter(
    value => value._id === parseInt(props.user.id, 10),
  );
  if (broadcasters.length > 0 || audiences.length > 0) {
    isJoined = true;
  }

  return (
    <Touchable
      onPress={() => {
        // NavigationService.navigate(SCREENS.PROFILE_VIEW, { user: props.item });
      }}
    >
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <FastImage
            source={typeof picture === "string" ? { uri: picture } : picture}
            style={styles.image}
          />
        </View>
        <View style={styles.itemContentContainer}>
          <Text style={styles.subject}>{props.user.first_name}</Text>
          <Text style={styles.preview}>{props.user.username}</Text>
        </View>
        <View style={styles.timeContainer}>
          <GradientButton
            onPress={() => props.onInviteFriend && props.onInviteFriend()}
            colors={GRADIENT.BUTTON}
            containerStyle={styles.addButton}
            textStyle={styles.addButtonText}
            disabled={isInvited || isJoined}
            text={isJoined ? "Joined" : isInvited ? "Invited" : "Invite"}
          />
        </View>
      </View>
    </Touchable>
  );
};

export default ModalFriendItem;
