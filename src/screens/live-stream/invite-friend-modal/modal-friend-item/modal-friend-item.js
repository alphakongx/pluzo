import React from "react";
import { View } from "react-native";
import { Image, Text, Touchable, GradientButton } from "@components";
import { GRADIENT } from "@config";
import styles from "./modal-friend-item.style";

const ModalFriendItem: () => React$Node = props => {
  return (
    <Touchable
      onPress={() => {
        // NavigationService.navigate(SCREENS.PROFILE_VIEW, { user: props.item });
      }}
    >
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require("@assets/images/message-image.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.itemContentContainer}>
          <Text style={styles.subject}>{"Friend Name"}</Text>
          <Text style={styles.preview}>{"@username"}</Text>
        </View>
        <View style={styles.timeContainer}>
          <GradientButton
            colors={GRADIENT.BUTTON}
            containerStyle={styles.addButton}
            textStyle={styles.addButtonText}
            text={"Invite"}
          />
        </View>
      </View>
    </Touchable>
  );
};

export default ModalFriendItem;
