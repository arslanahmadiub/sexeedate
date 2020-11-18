const initalState = {
  users: [
    {
      Detail: {
        bio: "",
        userImages: {
          imageUrl: "",
        },

        video: {
          image_url: "",
        },
      },
      dob: "",
      email: "",
      firstName: "",
      fullName: "",
      gender: "",
      role: "",
      _id: "",
      subStatus: "",
      subOverDate: "",
    },
  ],
  showMessage: false,
  messageFriendList: [],
  unreadMessages: "",
};

export const userIdReducer = (state = initalState, action) => {
  switch (action.type) {
    case "CREATE_USER":
      return {
        ...state,
        users: action.payload,
      };
    case "SHOW_BOX":
      return {
        ...state,
        showMessage: action.payload,
      };
    case "MESSAGE_LIST":
      return {
        ...state,
        messageFriendList: action.payload,
      };
    case "UNREAD_MESSAGE":
      return {
        ...state,
        unreadMessages: action.payload,
      };
    default:
      return state;
  }
};
