import axios from "axios";
import history from "../history";

const TOKEN = "token";

//Action Types
const GET_MOOD = "FETCH_TODAYS_MOOD";

//Action Creators
const getTodaysMood = (mood) => ({ type: GET_MOOD, mood });

//Thunks
export const getTodaysMoodThunk = (isLoggedIn) => async (dispatch) => {
  try {
    if (isLoggedIn) {
      const token = localStorage.getItem(TOKEN);
      const res = await axios.get("/api/mood/today", {
        headers: { token },
      });
      dispatch(getTodaysMood(res.data));
    }
  } catch (err) {
    console.error(err);
  }
};

//reducer
export default function (state = {}, action) {
  switch (action.type) {
    case GET_MOOD:
      return action.mood;
    default:
      return state;
  }
}
