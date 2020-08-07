import ProfileSettings from "./profile-settings.screen";
import { connect } from "react-redux";
import { UserCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    user: state.user.user,
    deletingImageId: state.user.isDeletingImage,
  };
}

const mapDispatchToProps = {
  updateUser: UserCreators.requestUpdateUser,
  deleteImage: UserCreators.requestDeleteImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings);
