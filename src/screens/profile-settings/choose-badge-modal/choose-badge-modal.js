import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { Image, Text, BackButton, Touchable, AutoDragSortableView } from "@components";
import { BlurView } from "@react-native-community/blur";
import LinearGradient from "react-native-linear-gradient";
import Modal from "react-native-modal";

import { GRADIENT } from "@config";
import Images from "@assets/Images";
import styles from "./choose-badge-modal.style";

const allBadgesList = [
  { id: 1, icon: Images.live.tagPicture, selected: false },
  { id: 2, icon: Images.live.tagMusic, selected: false },
  { id: 3, icon: Images.live.tagBox, selected: false },
  { id: 4, icon: Images.live.tagLove, selected: false },
  { id: 5, icon: Images.live.tagSport, selected: false },
  { id: 6, icon: Images.live.tagSea, selected: false },
  { id: 7, icon: Images.live.tagTravel, selected: false },
  { id: 8, icon: Images.live.tagPicture, selected: false },
];

class ChooseBadgeModal extends Component {
  constructor(props) {
    super(props);

    let badges = [
      { id: 1, icon: Images.live.tagPicture },
      { id: 2, icon: Images.live.tagMusic },
      { id: 3, icon: Images.live.tagBox },
    ];
    var arrBadges = [];
    allBadgesList.forEach((value, index) => {
      let sameBadges = badges.filter(badge => value.id === badge.id);
      if (sameBadges.length !== 0) {
        value.selected = true;
      }
      arrBadges.push(value);
    });

    this.state = {
      badges,
      arrBadges,
      dragIndex: -1,
    };
  }

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
      >
        <LinearGradient
          colors={GRADIENT.SCREEN_BACKGROUND}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.container}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.titleText}>Profile Badges</Text>
            <BackButton icon={Images.app.icBack} onPress={this.props.dismissModal} />
          </View>

          <View style={styles.myBadgeScroll}>
            <AutoDragSortableView
              horizontal={true}
              dataSource={badges}
              parentWidth={badges.length * 46}
              childrenWidth={36}
              childrenHeight={36}
              marginChildrenLeft={10}
              maxScale={1}
              onDragStart={index => {
                this.setState({ dragIndex: index });
              }}
              onDragEnd={() => {
                this.setState({ dragIndex: -1 });
              }}
              onDataChange={data => {
                this.setState({ badges: data });
              }}
              keyExtractor={(item, index) => item.id}
              renderItem={(item, index) => {
                return (
                  <View
                    style={[
                      styles.myBadgeView,
                      this.state.dragIndex === index ? styles.badgeActive : {},
                    ]}
                  >
                    <Image source={item.icon} style={styles.badgeImage} />
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
                        <Image source={badge.icon} style={styles.badgeImage} />
                      </View>
                    </Touchable>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </LinearGradient>
      </Modal>
    );
  }
}

export default ChooseBadgeModal;
