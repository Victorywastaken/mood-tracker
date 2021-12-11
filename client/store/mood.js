import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

//Action Types
const SET_MOOD = 'SET_MOOD'
const GET_MOOD = 'GET_MOOD'


//Action Creators
const getMood = mood => ({type: GET_MOOD, mood})
const setMood = mood => ({type: SET_MOOD, mood})

//Thunks
export const getMoodThunk = (isLoggedIn) => async dispatch => {
  try {
    if(isLoggedIn) {
      const token = localStorage.getItem(TOKEN)
      const res = await axios.get('/api/mood', {
      headers: {token}
    })
    dispatch(getMood(res.data))
    }
  } catch (err) {
    console.error(err)
  }
}

export const setMoodThunk = (moodObj) => async dispatch => {
  const token = localStorage.getItem(TOKEN);
  //route, bodyParams, token
  const config = {
    headers: { token }
  };

  const bodyParameters = {
    moodObj
  };

  try {
    if(token){
      const res = await axios.post('/api/mood', moodObj, {headers: {token}});
      return dispatch(setMood(res.data))
    } else {
      history.push('/login')
    }
  } catch (error) {
    console.log('error in moodThunk', error);
  }
}

//reducer
export default function(state = [], action) {
  switch (action.type) {
    case GET_MOOD:
      return action.mood
    case SET_MOOD:
      return action.mood
    default:
      return state
  }
}
