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

  useEffect(() => {
    dispatch(getTodaysMoodThunk(isLoggedIn))
    dispatch(getTodaysActivityThunk(isLoggedIn))
  }, [isLoggedIn])

  console.log(currentMood)
  return (
    <div className='home-container'>
      <header className='status-screen'>
        <div className='date-container'>
          <h1 className='day'>12</h1>
          <p>DEC</p>
        </div>
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
