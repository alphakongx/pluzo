export default {
  user: {
    token: "",
    session: null,
    user: null,
    mentor: null,
    location: null,
    isLoggingIn: false,
    isRegistring: false,
    isCheckingPhone: false,
    isLoadingProfile: false,
    isSendingPhoneLoginCode: false,
    isConfirmingPhoneLoginCode: false,
    isSendingPhoneVerificationCode: false,
    isConfirmingPhoneVerificationCode: false,
    isSendingForgotPasswordCode: false,
    isConfirmingForgotPasswordCode: false,
    isResettingPassword: false,
    isDeletingImage: 0,
    isDeletingAccount: false,
  },
  registration: {
    firstName: "",
    birthDate: null,
    gender: "",
    username: "",
    password: "",
    picture: null,
    phoneNumber: "",
    isCheckingUsername: false,
  },
  inbox: {
    channels: [],
    isLoadingChannels: false,
    friends: [],
    isLoadingFriends: false,
    pendingFriends: [],
    isLoadingPendingFriends: false,
    isAddingFriend: false,
  },
  chat: {
    chatId: null,
    messages: [],
    isLoadingMessages: false,
  },
  swipe: {
    cards: [],
    likecount: 0,
    cardImageIndex: 0,
    isLoadingCards: false,
    isLoadingMatch: false,
  },
  search: {
    friends: [],
    chat: [],
    people: [],
    live: [],
    isSearching: false,
  },
};
