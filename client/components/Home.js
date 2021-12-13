import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Calendar from 'react-calendar'
import './Home.css'
import './Calendar.css';
import moodColors from '../helpers/moodColors';
import { getTodaysMoodThunk } from '../store/singleMood';
import { getTodaysActivityThunk } from '../store/singleActivity';

/**
 * COMPONENT
 */
export const Home = props => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.id);
  const currentMood = useSelector(state => state.singleMood)
  const currentActivity = useSelector(state => state.singleActivity)
  const username = useSelector((state) => state.auth.username)

  const [color, setColor] = React.useState(currentMood.mood) || '';

  useEffect(() => {
    dispatch(getTodaysMoodThunk(isLoggedIn))
    dispatch(getTodaysActivityThunk(isLoggedIn))
    setColor(currentMood.mood)
  }, [isLoggedIn])

  const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const d = new Date();
  let day = d.getDate();
  let name = month[d.getMonth()];

  const DateContainer = () => {
    return (
      currentMood.mood
      ? (
      <div className={`date-container ${currentMood.mood}`}>
        <h1 className='day'>{day}</h1>
        <p>{name}</p>
      </div>
    ) : (
      <div className='date-container'>
        <h1 className='day'>{day}</h1>
        <p>{name}</p>
      </div>
    )
    )
  }

  console.log(currentMood.mood)
  return (
    <div className='home-container'>
      <header className='status-screen'>
        <DateContainer />
        <div className='mood-container'>
          <h1>{currentMood.mood}</h1>
          {currentMood.description === '' ? <p>No entry was added.</p> : <p>{currentMood.description}</p>}
        </div>
      </header>
      <div className='calendar-screen'>
        <div className='calendar-container'>
          <Calendar />
        </div>
      </div>
    </div>
  )
}




export default Home
