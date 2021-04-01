import React from "react";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import { AppCreators } from "@redux/actions";

const ModalBase: () => React$Node = props => {

  const { onModalShow, onModalHide, needUpdate=true, ...rest } = props;

  const modalShow = () => {
    if (needUpdate === true) {
      props.updateModalShowed(true);
    }
    onModalShow && onModalShow();
  }

  const modalHide = () => {
    if (needUpdate === true) {
      props.updateModalShowed(false);
    }
    onModalHide && onModalHide();
  }

  return <Modal {...rest} onModalShow={modalShow} onModalHide={modalHide} />;
};

const mapDispatchToProps = {
  updateModalShowed: AppCreators.updateModalShowed,
};

export default connect(null, mapDispatchToProps)(ModalBase);
