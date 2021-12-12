import axios from 'axios';
import history from "../history"

const TOKEN = 'token';

//Action Types
const GET_ACTIVITIES = 'GET_ACTIVITIES';
const EDIT_ACTIVITY = 'EDIT_ACTIVITY';
const DELETE_ACTIVITY = 'DELETE_ACTIVITY';
const ADD_ACTIVITY = 'ADD_ACTIVITY';

//action creators
const getActivities = activities => ({
  type: GET_ACTIVITIES,
  activities
});

const editActivity = activity => ({
  type: EDIT_ACTIVITY,
  activity
});

const deleteActivity = activity => ({
  type: DELETE_ACTIVITY,
  activity
});

const addActivity = activity => ({
  type: ADD_ACTIVITY,
  activity
});

//Thunks
export const getActivitiesThunk = (isLoggedIn) => async dispatch => {
  try {
    if(isLoggedIn){
      const token = localStorage.getItem(TOKEN);
      const res = await axios.get('/api/activity', {
        headers: { token }
        });
      dispatch(getActivities(res.data));
    }
  } catch (err) {
    console.log(err);
  }
};

export const addActivitiesThunk = (activity) => async dispatch => {
  try {
    const token = localStorage.getItem(TOKEN);
    const res = await axios.post('/api/activity/batch', activity, {
      headers: { token }
    });
    dispatch(addActivity(res.data));
    history.push('/home');
  } catch (err) {
  console.log(err);
  }
};

//reducer
export default function(state = [], action) {
  switch (action.type) {
    case GET_ACTIVITIES:
      return action.activities;
    case EDIT_ACTIVITY:
      return state.map(activity =>
        activity.id === action.activity.id ? action.activity : activity
      );
    case DELETE_ACTIVITY:
      return state.filter(activity => activity.id !== action.activity.id);
    case ADD_ACTIVITY:
      return [...state, action.activity];
    default:
      return state;
  }
}
