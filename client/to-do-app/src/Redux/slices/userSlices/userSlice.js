import { setData, clearData } from "./index";
import { appDispatch } from "../../store";
import axios from "axios";
const back_url = process.env.REACT_APP_BACKEND_URL;

export const setUserData = (dispatch) => {
  let token = "";
  dispatch = appDispatch();
  const session = JSON.parse(localStorage.getItem("userSession"));
  if (session) {
    token = session.token;
    return axios
      .get(`${back_url}/users/token`, {
        headers: {
          authorization: `bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(setData(response.data));
      });
  }
};

export const clearUserData = () => {
  appDispatch(clearData());
};
