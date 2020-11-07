const initalState = {

    requestBoxShow:false,
    friendVideoShow:false

};

export const friendRequestReducer = (state = initalState, action) => {
  switch (action.type) {
    case "FRIEND_REQUEST_BOX":
      return {
        ...state,
        requestBoxShow: action.payload,
      };
    case "SHOW_FRIEND_VIDEO":
      return {
        ...state,
        friendVideoShow: action.payload,
      };

    default:
      return state;
  }
};
