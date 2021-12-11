import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

//Action Types
const SET_MOOD = 'SET_MOOD'

//Action Creators
const setMood = mood => ({type: SET_MOOD, mood})

export const moodThunk = (mood) => async dispatch => {
  const token = localStorage.getItem(TOKEN);

  const config = {
    headers: { token }
  };

  const bodyParameters = {
    mood
  };

  try {
    if(token){
      const res = await axios.post('/api/mood', {mood}, {headers: {token}});
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
    case SET_MOOD:
      return action.mood
    default:
      return state
  }
}
