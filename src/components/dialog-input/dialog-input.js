import React, { PureComponent } from "react";
import {
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./dialog-input.style";

class DialogInput extends PureComponent{
  constructor(props){
    super(props);
    this.state = { inputModal: props.initValueTextInput, openning: true };
  }

  handleOnRequestClose = () => {
    this.props.closeDialog();
    this.setState({ inputModal: '' });
  };

  handleOnKeyPress = () => {
    this.setState({ openning: false });
  };

  handleOnChangeText = (inputModal) => {
    this.setState({ inputModal, openning: false });
  };

  handleOnCloseDialog = () => {
    this.props.closeDialog();
    this.setState({ inputModal: '',openning: true });
  };

  handleSubmit = () => {
    this.props.submitInput(this.state.inputModal);
    this.setState({ inputModal: '',openning: true });
  };

  render(){
    const title = this.props.title || '';
    const hintInput = this.props.hintInput || '';
    let value = '';
    if (!this.state.openning) {
      value = this.state.inputModal;
    }else{
      value = this.props.initValueTextInput ? this.props.initValueTextInput : '';
    }

    const textProps = this.props.textInputProps || null;
    const modalStyleProps = this.props.modalStyle || {};
    const dialogStyleProps = this.props.dialogStyle || {};
    const placeholderTextColor = this.props.placeholderTextColor
    const animationType = this.props.animationType || 'fade';
    let cancelText = this.props.cancelText || 'Cancel';
    let submitText = this.props.submitText || 'Submit';
    cancelText = (Platform.OS === 'ios')? cancelText:cancelText.toUpperCase();
    submitText = (Platform.OS === 'ios')? submitText:submitText.toUpperCase();

    return(
      <Modal
        animationType={animationType}
        transparent={true}
        visible={this.props.isDialogVisible}
      	onRequestClose={this.handleOnRequestClose}>
        <View style={[styles.container, {...modalStyleProps}]}  >
          <TouchableOpacity style={styles.container} activeOpacity={1} onPress={this.handleOnCloseDialog}>
            <View style={[styles.modal_container, {...dialogStyleProps}]} >
              <View style={styles.modal_body} >
                <Text style={styles.title_modal}>{title}</Text>
                <Text style={[this.props.message ? styles.message_modal : {height:0} ]}>{this.props.message}</Text>
                <TextInput style={styles.input_container}
                  autoCorrect={(textProps && textProps.autoCorrect==false)?false:true}
                  autoCapitalize={(textProps && textProps.autoCapitalize)?textProps.autoCapitalize:'none'}
                  clearButtonMode={(textProps && textProps.clearButtonMode)?textProps.clearButtonMode:'never'}
                  clearTextOnFocus={(textProps && textProps.clearTextOnFocus==true)?textProps.clearTextOnFocus:false}
                  keyboardType={(textProps && textProps.keyboardType)?textProps.keyboardType:'default'}
                  secureTextEntry={(textProps && textProps.secureTextEntry)?textProps.secureTextEntry:false}
                  maxLength={(textProps && textProps.maxLength > 0)?textProps.maxLength:null}
                  autoFocus={true}
                  onKeyPress={this.handleOnKeyPress}
                  underlineColorAndroid='transparent'
                  placeholder={hintInput}
                  placeholderTextColor={placeholderTextColor}
                  onChangeText={this.handleOnChangeText}
                  value={value}
                  />
              </View>
              <View style={styles.btn_container}>
                <TouchableOpacity  style={styles.touch_modal}
                  onPress={this.handleSubmit}>
                  <Text style={styles.btn_modal_right}>{submitText}</Text>
                </TouchableOpacity>
                <View style={styles.divider_btn}></View>
                <TouchableOpacity style={styles.touch_modal}
                  onPress={this.handleOnCloseDialog}>
                  <Text style={styles.btn_modal_left}>{cancelText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

export default DialogInput;