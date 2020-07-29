import React, { Component } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Touchable, Image, Text } from "@components";
import { Switch } from "react-native-switch";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import Images from "@assets/Images";
import Header from "../header";

import styles from "./swipe-settings.style";

const screenWidth = Dimensions.get("window").width;

class SwipeSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollEnabled: true,
      distance: 20,
      minAge: 18,
      maxAge: 25,
      aroundWorld: false,
    }
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  enableScroll = () => this.setState({ scrollEnabled: true });
  disableScroll = () => this.setState({ scrollEnabled: false });

  render() {

    const { distance, minAge, maxAge, aroundWorld } = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeAreaContainer}>
          <ScrollView scrollEnabled={this.state.scrollEnabled}>
            <Header 
              title={"Discovery"}
              onBack={this.goBack} />

            <View style={[styles.flexRow, styles.itemPadding]}>
              <Text style={styles.titleText}>Location</Text>
              <View>
                <Text style={styles.valueText}>My Current Location</Text>
                <Text style={styles.subValueText}>LOS ANGELES, CALIFORNIA</Text>
              </View>
              <Image source={Images.app.icRight}
                style={styles.arrowRight} />
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
              onValuesChange={(value) => {
                this.setState({distance: value[0]});
              }}
              customMarker={() => {
                return (
                  <View style={styles.thumbMaker} />
                )
              }}
              containerStyle={styles.sliderContainer}
              trackStyle={styles.tracker}
              selectedStyle={styles.selectedTracker}
              unselectedStyle={styles.unselectedTracker}
              sliderLength={screenWidth - 50}
              min={0}
              max={100}
              values={[distance]}
            />
            
            <View style={[styles.flexRow, styles.itemPadding]}>
              <Text style={styles.titleText}>Show Me</Text>
              <View>
                <Text style={styles.valueText}>Women</Text>
              </View>
              <Image source={Images.app.icRight}
                style={styles.arrowRight} />
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
              onValuesChange={(value) => {
                this.setState({minAge: value[0], maxAge: value[1]});
              }}
              customMarker={() => {
                return (
                  <View style={styles.thumbMaker} />
                )
              }}
              containerStyle={styles.sliderContainer}
              trackStyle={styles.tracker}
              selectedStyle={styles.selectedTracker}
              unselectedStyle={styles.unselectedTracker}
              sliderLength={screenWidth - 50}
              min={18}
              max={75}
              values={[minAge, maxAge]}
            />
            <View style={styles.separator} />

            <View style={[styles.flexRow, styles.itemPadding]}>
              <Text style={styles.titleText}>Global</Text>
              <Switch
                value={aroundWorld}
                onValueChange={(val) => this.setState({aroundWorld: val})}
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
              Going gobal will allow you to see people from around the world after you've run out of profile nearby.
            </Text>
            
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

export default SwipeSettings;
