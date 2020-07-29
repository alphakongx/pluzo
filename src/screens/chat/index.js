import Chat from "./chat.screen";
import { connect } from "react-redux";
import { ChatCreators } from "@redux/actions";

function mapStateToProps(state, { navigation }) {
  return {
    token: state.user.token,
    user: state.user.user,
    messages: state.chat.messages,
    loading: state.chat.isLoadingMessages,
    chatUser: navigation.getParam("chatUser"),
    chatId: navigation.getParam("chatId"),
  };
}

const mapDispatchToProps = {
  requestMessages: ChatCreators.requestGetCurrentChat,
  updateMessages: ChatCreators.updateCurrentMsg,
  sendMessage: ChatCreators.requestSendMsg,
  readMessage: ChatCreators.requestReadMsg,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
