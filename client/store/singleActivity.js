import axios from "axios";
import history from "../history";

const TOKEN = "token";

//Action Types
const GET_TODAYS_ACTIVITY = "GET_TODAYS_ACTIVITY";

//Action Creators
const getTodaysActivity = (activity) => ({
  type: GET_TODAYS_ACTIVITY,
  activity,
});

//Thunks
export const getTodaysActivityThunk = () => async (dispatch) => {
  try {
    const token = localStorage.getItem(TOKEN);
    const res = await axios.get("/api/activity/today", {
      headers: { token },
    });
    dispatch(getTodaysActivity(res.data));
  } catch (err) {
    console.error(err);
  }
};

//reducer
export default function (state = [], action) {
  switch (action.type) {
    case GET_TODAYS_ACTIVITY:
      return action.activity;
    default:
      return state;
  }
}
