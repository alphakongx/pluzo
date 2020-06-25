import React from "react";
import { Image, View } from "react-native";
import { GradientButton, ProgressBar, Screen, Text, Touchable } from "@components";
import styles from "./signup-birthdate.style.js";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

const SignupFirstName: () => React$Node = props => {
  const goBack = () => {
    props.navigation.goBack();
  };

  return (
    <Screen>
      <View style={styles.container}>
        <ProgressBar />
        <Touchable onPress={goBack}>
          <View style={styles.backButtonContainer}>
            <Image source={require("@assets/images/chevron-left.png")} />
          </View>
        </Touchable>
        <View style={styles.contentContainer}>
          <View style={styles.titleFieldContainer}>
            <Text style={styles.titleText}>When were you born?</Text>

            {/*<DateTimePicker
              testID='dateTimePicker'
              value={new Date(1598051730000)}
              mode={"date"}
              is24Hour={true}
              display='default'
              textColor='white'
            />
            */}
            <Calendar
              theme={{
                backgroundColor: "transparent",
                calendarBackground: "transparent",
              }}
              current={"2012-03-01"}
              minDate={"2012-05-10"}
              maxDate={"2012-05-30"}
              onDayPress={day => {
                console.log("selected day", day);
              }}
              onDayLongPress={day => {
                console.log("selected day", day);
              }}
              monthFormat={"yyyy MM"}
              onMonthChange={month => {
                console.log("month changed", month);
              }}
              hideArrows={true}
              // Replace default arrows with custom ones (direction can be 'left' or 'right')
              // renderArrow={direction => <Arow />}
              // Do not show days of other months in month page. Default = false
              hideExtraDays={true}
              // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
              // day from another month that is visible in calendar page. Default = false
              disableMonthChange={true}
              // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
              firstDay={1}
              // Hide day names. Default = false
              hideDayNames={true}
              // Show week numbers to the left. Default = false
              showWeekNumbers={true}
              // Handler which gets executed when press arrow icon left. It receive a callback can go back month
              onPressArrowLeft={subtractMonth => subtractMonth()}
              // Handler which gets executed when press arrow icon right. It receive a callback can go next month
              onPressArrowRight={addMonth => addMonth()}
              // Disable left arrow. Default = false
              disableArrowLeft={true}
              // Disable right arrow. Default = false
              disableArrowRight={true}
              // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
              disableAllTouchEventsForDisabledDays={true}
              /** Replace default month and year title with custom one. the function receive a date as parameter. */
              // renderHeader={(date) => {/*Return JSX*/}}
            />
          </View>

          <View style={styles.buttonContainer}>
            <GradientButton
              onPress={() => {
                props.navigation.navigate("SIGNUP_GENDER_SELECT", {});
              }}
              text={"Continue"}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
};

export default SignupFirstName;
