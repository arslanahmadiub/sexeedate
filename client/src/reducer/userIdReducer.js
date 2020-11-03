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
    },
  ],
};

export const userIdReducer = (state = initalState, action) => {
  switch (action.type) {
    case "CREATE_USER":
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};
