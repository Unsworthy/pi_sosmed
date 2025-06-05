import { APISERVICE, config } from "../../src/utils/services";

export const storePosting = (token, data) => (dispatch) =>
  APISERVICE()
    .post("/post/create", data, config(token))
    .then((response) => {
      dispatch({
        type: "POST_MESSAGE_SUCCESS",
        payload: {
          message: response?.data?.message,
        },
      });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        window.location.href = "/login";
      }
      dispatch({
        type: "POST_FAIL",
        payload: {
          err: err.response,
        },
      });
    });

export const fetchPosting = (token) => (dispatch) => {
  dispatch({ type: "POST_INIT" });
  APISERVICE()
    .get("/post/list", config(token))
    .then((response) => {
      dispatch({
        type: "POST_SUCCESS",
        payload: {
          data: response?.data?.data,
        },
      });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        window.location.href = "/login";
      }
      dispatch({
        type: "POST_FAIL",
        payload: {
          err: err.response,
        },
      });
    });
};
