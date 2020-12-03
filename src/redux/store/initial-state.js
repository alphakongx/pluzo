export default {
  user: {
    token: "",
    session: null,
    user: null,
    mentor: null,
    location: null,
    notification: null,
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
    isSendingPhoneUpdateCode: false,
    isConfirmingPhoneUpdateCode: false,
    pushEnabled: true,
  },
  registration: {
    firstName: "",
    birthDate: null,
    gender: "",
    likeGender: "",
    username: "",
    password: "",
    picture1: null,
    picture2: null,
    picture3: null,
    phoneNumber: "",
    isCheckingUsername: false,
  },
  live: {
    sortBy: "friends",
    filterCountry: {
      name: "Worldwide",
      iso2: "worldwide",
      dialCode: "",
      priority: 0,
      areaCodes: null,
    },
    // camera, mic
    isEnabledCamera: true,
    isEnabledMic: true,
    streamStatus: null,
    isScrolling: false,
    isAskedToJoin: false,
    allStreams: [],
    trendingStreams: [],
    friendStreams: [],
    broadcasters: [],
    audiences: [],
    messages: [],
    stream: null,
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
    chatUserId: null,
    messages: [],
    isLoadingMessages: false,
  },
  swipe: {
    cards: [],
    likecount: 0,
    visibleDetail: false,
    isLoadingCards: false,
    isLoadingMatch: false,
    settings: null,
    showSwipeTutorial: false,
  },
  search: {
    friends: [],
    chat: [],
    people: [],
    live: [],
    isSearching: false,
  },
};
