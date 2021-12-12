import axios from 'axios';
import history from '../history'

const TOKEN = 'token';

const GET_CATEGORIES = 'GET_CATEGORIES';

const getCategories = categories => ({
  type: GET_CATEGORIES,
  categories
});

export const getCategoriesThunk = (isLoggedIn) => async dispatch => {
  try{
    if(isLoggedIn){
      const token = localStorage.getItem(TOKEN);
      const res = await axios.get('/api/activity/categories', {
        headers: { token }
      });
      dispatch(getCategories(res.data));
    }
  } catch(err){
    console.error(err);
  }
}

export default function(state = [], action){
  switch(action.type){
    case GET_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}
