import React, { Component } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { Text, BackButton, Touchable, Image } from "@components";
import { BlurView } from "@react-native-community/blur";
import LinearGradient from "react-native-linear-gradient";
import Modal from "react-native-modal";

import { GRADIENT } from "@config";
import Images from "@assets/Images";
import styles from "./pending-request-modal.style";

class PendingRequestModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
    };
  }

  componentDidMount() {
    this.setState({requests: this.props.pendingFriends});
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.pendingFriends) !== JSON.stringify(this.props.pendingFriends)) {
      this.setState({requests: this.props.pendingFriends});
    }
  }

  onDismissModal = () => {
  }

  onLoadRequests = () => {
    this.props.loadRequests(this.props.token);
  }

  onAcceptRequest = (userId) => {
    this.props.acceptRequest(userId, this.props.token);
    var { requests } = this.state;
    requests = requests.filter((value) => value.id !== userId);
    this.setState({requests});
  }

  onRejectRequest = (userId) => {
    this.props.rejectRequest(userId, this.props.token);
    var { requests } = this.state;
    requests = requests.filter((value) => value.id !== userId);
    this.setState({requests});
  }

  render() {
    const { requests } = this.state;
    const { isLoadingPendingFriends } = this.props;
    return (
      <Modal
        {...this.props}
        customBackdrop={
          <BlurView
            style={styles.flexFill}
            blurType='dark'
            blurAmount={10}
            reducedTransparencyFallbackColor='#0B0516'
          />
        }
        animationIn={"zoomIn"}
        animationOut={"zoomOut"}
        backdropTransitionOutTiming={0}
        backdropOpacity={1}
        useNativeDriver={false}
        propagateSwipe={true}
        onModalShow={this.onLoadRequests}
        onModalHide={this.onDismissModal}
      >
        <LinearGradient
          colors={GRADIENT.SCREEN_BACKGROUND}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.container}
        >
          <View style={styles.headerContainer}>
            <BackButton icon={Images.app.icBackLeft} onPress={this.props.dismissModal} />
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>Pending Requests</Text>

            { 
              isLoadingPendingFriends ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size={"large"} color={"white"} />
                </View>
              ) : (
                <FlatList
                  style={styles.requesterList}
                  data={requests}
                  keyExtractor={item => `pending-requests-${item.id}`}
                  ItemSeparatorComponent={() => <View style={styles.separator} />}
                  renderItem={({item: item, index}) => (
                    <Touchable>
                      <View style={styles.requestContainer}>
                        <View style={styles.imageContainer}>
                          <Image
                            source={{uri: item.image}}
                            style={styles.image}
                          />
                        </View>
                        <View style={styles.userContainer}>
                          <Text style={styles.firstname}>{item.first_name}</Text>
                          <Text style={styles.username}>{item.username}</Text>
                        </View>
                        <Touchable style={styles.crossButton}>
                          <Image source={Images.app.icCross} style={styles.crossIcon} />
                        </Touchable>
                        <Touchable style={styles.checkButton}
                          onPress={() => {this.onAcceptRequest(item.id)}}>
                          <Image source={Images.app.icCheck} style={styles.checkIcon} />
                        </Touchable>
                      </View>
                    </Touchable>
                  )}
                />
              )
            }
          </View>
        </LinearGradient>
      </Modal>
    );
  }
}

export default PendingRequestModal;
