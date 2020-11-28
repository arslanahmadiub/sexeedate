const initalState = {
  requestBoxShow: false,
  friendVideoShow: false,
  freindRequest: [],
  friendRequestProfile: [],
  logout: false,
};

export const friendRequestReducer = (state = initalState, action) => {
  switch (action.type) {
    case "FRIEND_REQUEST_BOX":
      return {
        ...state,
        requestBoxShow: action.payload,
      };
    case "SHOW_LOGOUT":
      return {
        ...state,
        logout: action.payload,
      };
    case "SHOW_FRIEND_VIDEO":
      return {
        ...state,
        friendVideoShow: action.payload,
      };
    case "SET_FRIEND_REQUEST":
      return {
        ...state,
        freindRequest: action.payload,
      };
    case "SET_FRIEND_PROFILE":
      let newData = state.freindRequest.filter(
        (item) => item._id == action.payload
      );

      return {
        ...state,
        friendRequestProfile: newData,
      };
    case "REMOVE_FRIEND_PROFILE":
      let removeData = state.freindRequest.filter(
        (item) => item._id !== action.payload
      );

      return {
        ...state,
        freindRequest: removeData,
      };

    default:
      return state;
  }
};
