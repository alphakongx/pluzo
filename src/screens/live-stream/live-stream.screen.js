import React, { Component } from "react";
import { SafeAreaView, View, FlatList } from "react-native";
import { Image, Touchable } from "@components";
import { BlurView } from "@react-native-community/blur";
import Images from "@assets/Images";
import StreamPlayer from "./stream-player";
import UserCount from "../../components/user-count/user-count";

import styles from "./live-stream.style";

import StreamUserIcon from "./stream-user-icon";
import StreamMessageBox from "./stream-message-box";
import StreamUsers from "./stream-users";

class LiveStream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUsers: false,
      keyboardHeight: 10,
      messageBoxHeight: "50%",
    };
  }

  onKeyboardShow = e => {
    this.setState({
      keyboardHeight: e.endCoordinates.height,
      messageBoxHeight: 200,
    });
  };

  onKeyboardHide = e => {
    this.setState({
      keyboardHeight: 10,
      messageBoxHeight: "50%",
    });
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  showUsers = () => {
    this.setState({ showUsers: true });
  };

  hideUsers = () => {
    this.setState({ showUsers: false });
  };

  render() {
    const { showUsers, keyboardHeight, messageBoxHeight } = this.state;
    var data = [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }];

    return (
      <View style={styles.container}>
        <StreamPlayer navigation={this.props.navigation} style={styles.streamPlayer} />

        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={styles.safeAreaContainer}>
            <View style={styles.topBarContainer}>
              <Touchable style={styles.backButton} onPress={this.goBack}>
                <Image source={Images.app.icBack} style={styles.backImage} />
              </Touchable>

              <Touchable onPress={this.showUsers}>
                <UserCount
                  style={styles.userCountStyle}
                  textStyle={styles.userTextStyle}
                  count={131}
                />
              </Touchable>
            </View>

            <View
              style={[
                styles.messageBox,
                { bottom: keyboardHeight, height: messageBoxHeight },
              ]}
            >
              <StreamMessageBox
                onKeyboardShow={this.onKeyboardShow}
                onKeyboardHide={this.onKeyboardHide}
              />
            </View>

            <View style={styles.streamUserContainer}>
              <FlatList
                style={styles.usersList}
                contentContainerStyle={styles.usersListContentContainerStyle}
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item: tag, index }) => (
                  <StreamUserIcon style={styles.streamUser} />
                )}
              />
            </View>
          </View>
        </SafeAreaView>

        {showUsers && (
          <View style={styles.usersContainer}>
            <BlurView
              style={styles.absolute}
              blurType='dark'
              blurAmount={10}
              reducedTransparencyFallbackColor='white'
            />
            <Touchable style={styles.absolute} onPress={this.hideUsers} />
            <StreamUsers />
          </View>
        )}
      </View>
    );
  }
}

export default LiveStream;
