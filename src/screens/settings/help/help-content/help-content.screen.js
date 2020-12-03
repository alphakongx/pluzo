import React, { useState } from "react";
import { SafeAreaView, View, TextInput } from "react-native";
import { Screen, Text, Touchable, Image } from "@components";
import ActionSheet from "react-native-actionsheet";
import ImagePicker from "react-native-image-crop-picker";
import Images from "@assets/Images";

import Header from "../../header";
import styles from "./help-content.style";

const HelpContentScreen: () => React$Node = props => {
  const [selectedFile, setSelectedFile] = useState(null);
  let actionSheet = React.createRef();

  const onSelectImage = (index) => {
    const options = {
      compressImageQuality: 0.7,
    };

    if (index === 0) {
      ImagePicker.openCamera(options).then(image => {
        setSelectedFile(image);
      });
    } else if (index === 1) {
      ImagePicker.openPicker(options).then(image => {
        setSelectedFile(image);
      });
    }
  }

  return (
    <Screen hasGradient style={styles.flexFill}>
      <SafeAreaView style={styles.flexFill}>
        <View style={styles.flexFill}>
          <Header title={""} onBack={props.navigation.goBack} />

          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>{"Ask your question below."}</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                placeholder={"Enter your text here..."}
                placeholderTextColor={"#ABA7D5"}
                multiline />
            </View>

            <Touchable style={styles.attachButtonContainer} onPress={() => actionSheet.show()}>
              {selectedFile === null && <Image source={Images.app.icPlus} style={styles.plusIcon} />}
              <Text style={styles.attachButtonText} numberOfLines={1}>
                {selectedFile === null ? "Attach a file" : `Attach the ${selectedFile.filename}${selectedFile.filename}${selectedFile.filename}${selectedFile.filename}${selectedFile.filename}`}
              </Text>
            </Touchable>
            <Touchable style={styles.buttonContainer}>
              <Text style={styles.buttonText}>{"Send"}</Text>
            </Touchable>
          </View>
          
        </View>
      </SafeAreaView>
      <ActionSheet
        ref={o => (actionSheet = o)}
        title={"Select"}
        options={["Take Photo...", "Choose from Library...", "Cancel"]}
        cancelButtonIndex={2}
        onPress={index => onSelectImage(index)}
      />
    </Screen>
  );
};

export default HelpContentScreen;
