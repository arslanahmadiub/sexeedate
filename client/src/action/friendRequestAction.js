export const showFriendRequestBox = (data) => {
  return {
    type: "FRIEND_REQUEST_BOX",
    payload: data,
  };
};

export const showFriendVideo = (data) => {
  return {
    type: "SHOW_FRIEND_VIDEO",
    payload: data,
  };
};

export const setFriendRequestData = (data) => {
  return {
    type: "SET_FRIEND_REQUEST",
    payload: data,
  };
};

export const setFriendRequestProfile = (data) => {
  return {
    type: "SET_FRIEND_PROFILE",
    payload: data,
  };
};

export const deleteFriendRequestAction = (data) => {
  return {
    type: "REMOVE_FRIEND_PROFILE",
    payload: data,
  };
};

export const showLogout = (data) => {
  return {
    type: "SHOW_LOGOUT",
    payload: data,
  };
};
