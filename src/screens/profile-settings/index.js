import ProfileSettings from "./profile-settings.screen";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { UserCreators, AppCreators } from "@redux/actions";

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
  requestProfile: UserCreators.requestProfile,
  updateUserImage: UserCreators.updateUserSuccess,
  reorderImages: UserCreators.requestReorderImages,
  requestPageTime: UserCreators.requestPageTime,
  showPurchase: AppCreators.showPurchase,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withSafeAreaInsets(ProfileSettings));
