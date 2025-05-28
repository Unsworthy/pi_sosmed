import { APISERVICE, config } from "../../src/utils/services";

export const fetchProfile = (token) => (dispatch) => {
  APISERVICE()
    .get("/auth/profile", config(token))
    .then((res) => {
      dispatch({
        type: "FETCH_PROFILE_SUCCESS",
        payload: {
          data: res?.data?.data,
        },
      });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        window.location.href = "/login";
      }
      dispatch({
        type: "FETCH_PROFILE_FAIL",
        payload: {
          error: err?.response?.data,
        },
      });
    });
};
