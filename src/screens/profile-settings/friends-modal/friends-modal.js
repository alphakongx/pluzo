import React from "react";
import { View, FlatList } from "react-native";
import { Text, Screen, BlurView, Touchable, BackButton } from "@components";
import Modal from "react-native-modal";
import SearchPeopleItem from "../../search/search-people-item";

import styles from "./friends-modal.style";

const FriendsModal: () => React$Node = props => {
  const onModalWillShow = () => {
    props.loadFriends(props.token);
  };

  return (
    <Modal
      {...props}
      customBackdrop={
        <Touchable style={styles.flexFill} onPress={props.onSwipeComplete}>
          <BlurView
            style={styles.flexFill}
            blurType='dark'
            blurAmount={10}
            reducedTransparencyFallbackColor='#0B0516'
          />
        </Touchable>
      }
      animationIn={"zoomIn"}
      animationOut={"zoomOut"}
      backdropTransitionOutTiming={0}
      backdropOpacity={1}
      useNativeDriver={false}
      propagateSwipe={true}
      onModalWillShow={onModalWillShow}
      swipeDirection={"down"}
      onSwipeComplete={props.onSwipeComplete}
    >
      <Screen hasGradient style={styles.container}>
        <View style={styles.header}>
          <BackButton onPress={props.onSwipeComplete} />
          <Text style={styles.titleText}>{`${
            props.friends === null ? "0" : props.friends.length
          } friends`}</Text>
        </View>
        <FlatList
          style={styles.friendList}
          keyExtractor={friend => `friend-id-${friend.id}`}
          data={props.friends}
          renderItem={({ item: friend, index }) => {
            return (
              <View style={styles.itemContainer}>
                <SearchPeopleItem
                  item={friend}
                  friend={true}
                  onChat={() => props.onSwipeComplete()}
                  onDismiss={() => props.onSwipeComplete()}
                />
              </View>
            );
          }}
        />
      </Screen>
    </Modal>
  );
};

export default FriendsModal;
