import { APISERVICE, config } from "../../src/utils/services";

export const fetchProfile = (token) => (dispatch) => {
  APISERVICE()
    .get("/auth/me", config(token))
    .then((res) => {
      dispatch({
        type: "FETCH_PROFILE_SUCCESS",
        payload: {
          data: res?.data?.data,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: "FETCH_PROFILE_FAIL",
        payload: {
          error: err?.response?.data,
        },
      });
    });
};
