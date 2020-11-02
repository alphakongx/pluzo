import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import {
  Screen,
  Image,
  Text,
  BackButton,
  Touchable,
  AutoDragSortableView,
} from "@components";
import { BlurView } from "@react-native-community/blur";
import Modal from "react-native-modal";
import { widthPercentageToDP as wp } from "@helpers";

import Images from "@assets/Images";
import styles from "./choose-badge-modal.style";

const allBadgesList = require("@config/data/badges.json");

class ChooseBadgeModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      badges: [],
      arrBadges: [],
      dragIndex: -1,
    };
  }

  onModalShow = () => {
    let arrBadges = [];
    let badges = this.props.user.badges.map(badge => ({
      id: badge,
      icon: allBadgesList[badge].icon,
    }));
    Object.values(allBadgesList).forEach((value, index) => {
      let sameBadges = badges.filter(
        badge => parseInt(value.id, 10) === parseInt(badge.id, 10),
      );
      if (sameBadges.length !== 0) {
        value.selected = true;
      } else {
        value.selected = false;
      }
      arrBadges.push(value);
    });
    this.setState({ badges, arrBadges });
  };

  onModalHide = () => {
    const params = new FormData();
    const { badges } = this.state;
    
    badges.forEach(badge => {
      params.append("badges[]", badge.id);
    });
    if (badges.length === 0) {
      params.append("remove_badges", 1);
    }
    this.props.updateUser(params, this.props.token);
  };

  onSelectBadge = index => {
    const { arrBadges, badges } = this.state;

    arrBadges[index].selected = !arrBadges[index].selected;
    if (arrBadges[index].selected) {
      let newBadges = [
        ...badges,
        { id: arrBadges[index].id, icon: arrBadges[index].icon },
      ];
      this.setState({ badges: newBadges });
    } else {
      let newBadges = badges.filter(item => item.id !== arrBadges[index].id);
      this.setState({ badges: newBadges });
    }
    this.setState({ arrBadges });
  };

  render() {
    const { badges, arrBadges } = this.state;

    return (
      <Modal
        {...this.props}
        customBackdrop={
          <Touchable style={styles.flexFill} onPress={this.props.dismissModal}>
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
        onModalShow={this.onModalShow}
        onModalWillHide={this.onModalHide}
        swipeDirection={"down"}
        onSwipeComplete={this.props.dismissModal}
      >
        <Screen hasGradient style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.titleText}>Profile Badges</Text>
            <BackButton icon={Images.app.icBack} onPress={this.props.dismissModal} />
          </View>

          <View style={styles.myBadgeScroll}>
            <AutoDragSortableView
              horizontal={true}
              dataSource={badges.length === 0 ? [1] : badges}
              parentWidth={badges.length === 0 ? wp(46) : badges.length * wp(46)}
              childrenWidth={wp(36)}
              childrenHeight={wp(36)}
              marginChildrenRight={wp(10)}
              maxScale={1}
              contentContainerStyle={styles.scrollContentCenter}
              onDragStart={index => {
                this.setState({ dragIndex: index });
              }}
              onDragEnd={() => {
                this.setState({ dragIndex: -1 });
              }}
              onDataChange={data => {
                this.setState({ badges: data });
              }}
              keyExtractor={(item, index) => typeof item !== "number" ? item.id : 0}
              renderItem={(item, index) => {
                return (
                  <View
                    style={[
                      styles.myBadgeView,
                      this.state.dragIndex === index ? styles.badgeActive : {},
                    ]}
                  >
                    {typeof item !== "number" &&
                    <Image source={Images.live[item.icon]} style={styles.badgeImage} />}
                  </View>
                );
              }}
            />
          </View>

          <Text style={styles.noteText}>
            Choose the badges you want to display on your profile
          </Text>

          <View style={styles.separatorLine} />

          <ScrollView style={styles.allBadgeScroll}>
            <View style={styles.flexWrap}>
              {arrBadges.map((badge, index) => {
                return (
                  <View style={styles.allBadgeItem} key={index}>
                    <Touchable
                      onPress={() => {
                        this.onSelectBadge(index);
                      }}
                    >
                      <View
                        style={
                          badge.selected
                            ? styles.badgeSelectedWrapper
                            : styles.badgeWrapper
                        }
                      >
                        <Image
                          source={Images.live[badge.icon]}
                          style={styles.badgeImage}
                        />
                      </View>
                    </Touchable>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </Screen>
      </Modal>
    );
  }
}

export default ChooseBadgeModal;
