import React from "react";
import { View } from "react-native";
import { Image, Text, Touchable, GradientButton, SolidButton } from "@components";
import styles from "./search-people-item.style";

const SearchPeopleItem: () => React$Node = props => {
  const { image, first_name, username } = props.item;
  return (
    <Touchable onPress={props.onPressItem}>
      <View style={styles.messageContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={image === null ? require("@assets/images/message-image.png") : {uri: image}}
            style={styles.image}
          />
        </View>
        <View style={styles.messageContentContainer}>
          <Text style={styles.subject}>{first_name === null ? "no name" : first_name}</Text>
          <Text style={styles.preview}>{username}</Text>
        </View>
        <View style={styles.timeContainer}>
        {
          props.friend ? (
            <GradientButton
              containerStyle={styles.addButton}
              textStyle={styles.addButtonText}
              text={"Chat"}
            />
          ):(
            props.isSent ? (
              <SolidButton
                containerStyle={styles.addButton}
                textStyle={styles.addButtonText}
                text={"Sent"}
              />
            ) :(
              <GradientButton
                containerStyle={styles.addButton}
                textStyle={styles.addButtonText}
                text={"Add"}
              />
            )
          )
        }
        </View>
      </View>
    </Touchable>
  );
};

export default SearchPeopleItem;
