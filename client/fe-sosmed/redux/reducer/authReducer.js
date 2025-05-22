const init = {
  load: true,
  token: null,
  user: null,
  message: "",
  err: null,
};

export const authReducer = (state = init, action) => {
  switch (action.type) {
    case "AUTH_INIT":
      return init;
      case "FETCH_PROFILE_SUCCESS":
        return {
            ...state,
            user: action?.payload?.data,
        };

      case "FETCH_PROFILE_FAIL":
        return {
            ...state,
            user: action?.payload?.error,
        };
    default:
      return state;
  }
};
