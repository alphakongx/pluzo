import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import { Touchable, Image, Text } from "@components";
import { Switch } from "react-native-switch";
import LinearGradient from "react-native-linear-gradient";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import Images from "@assets/Images";
import { GRADIENT } from "@config";

import styles from "./discovery-settings.style";

const screenWidth = Dimensions.get("window").width;

class DiscoverySettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollEnabled: true,
      distance: 20,
      minAge: 18,
      maxAge: 25,
      aroundWorld: false,
    };
  }

  render() {
    const { distance, minAge, maxAge, aroundWorld } = this.state;

    return (
      <LinearGradient
        colors={GRADIENT.SCREEN_BACKGROUND}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
        <View style={styles.headerContainer}>
          <Touchable
            style={styles.backButton}
            onPress={() => {
              if (this.props.onBack) {
                this.props.onBack();
              }
            }}
          >
            <Image source={Images.app.icBackLeft} style={styles.backButtonIcon} />
          </Touchable>
        </View>

        <Text style={styles.settingText}>{"Discovery"}</Text>

        <View style={[styles.flexRow, styles.itemPadding]}>
          <Text style={styles.titleText}>Location</Text>
          <View>
            <Text style={styles.valueText}>My Current Location</Text>
            <Text style={styles.subValueText}>LOS ANGELES, CALIFORNIA</Text>
          </View>
          <Image source={Images.app.icRight} style={styles.arrowRight} />
        </View>
        <View style={styles.separator} />

        <View style={[styles.flexRow, styles.itemPadding]}>
          <Text style={styles.titleText}>Maximum Distance</Text>
          <View>
            <Text style={styles.valueText}>{distance} mi</Text>
          </View>
        </View>
        <MultiSlider
          onValuesChangeStart={this.disableScroll}
          onValuesChangeFinish={this.enableScroll}
          onValuesChange={value => {
            this.setState({ distance: value[0] });
          }}
          customMarker={() => {
            return <View style={styles.thumbMaker} />;
          }}
          containerStyle={styles.sliderContainer}
          trackStyle={styles.tracker}
          selectedStyle={styles.selectedTracker}
          unselectedStyle={styles.unselectedTracker}
          sliderLength={screenWidth - 90}
          min={0}
          max={100}
          values={[distance]}
        />

        <View style={[styles.flexRow, styles.itemPadding]}>
          <Text style={styles.titleText}>Show Me</Text>
          <View>
            <Text style={styles.valueText}>Women</Text>
          </View>
          <Image source={Images.app.icRight} style={styles.arrowRight} />
        </View>
        <View style={styles.separator} />

        <View style={[styles.flexRow, styles.itemPadding]}>
          <Text style={styles.titleText}>Age Range</Text>
          <View>
            <Text style={styles.valueText}>{`${minAge}-${maxAge}`}</Text>
          </View>
        </View>
        <MultiSlider
          onValuesChangeStart={this.disableScroll}
          onValuesChangeFinish={this.enableScroll}
          onValuesChange={value => {
            this.setState({ minAge: value[0], maxAge: value[1] });
          }}
          customMarker={() => {
            return <View style={styles.thumbMaker} />;
          }}
          containerStyle={styles.sliderContainer}
          trackStyle={styles.tracker}
          selectedStyle={styles.selectedTracker}
          unselectedStyle={styles.unselectedTracker}
          sliderLength={screenWidth - 90}
          min={18}
          max={75}
          values={[minAge, maxAge]}
        />
        <View style={styles.separator} />

        <View style={[styles.flexRow, styles.itemPadding]}>
          <Text style={styles.titleText}>Global</Text>
          <Switch
            value={aroundWorld}
            onValueChange={val => this.setState({ aroundWorld: val })}
            circleSize={20}
            barHeight={24}
            circleBorderWidth={0}
            backgroundActive={"#02FFF3"}
            backgroundInactive={"#ABA7D5"}
            circleActiveColor={"white"}
            circleInActiveColor={"white"}
            renderActiveText={false}
            renderInActiveText={false}
            switchBorderRadius={12}
            switchWidthMultiplier={2.2}
          />
        </View>

        <Text style={styles.description}>
          Going gobal will allow you to see people from around the world after you've run
          out of profile nearby.
        </Text>
      </LinearGradient>
    );
  }
}

export default DiscoverySettings;
