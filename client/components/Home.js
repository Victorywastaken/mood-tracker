import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Calendar from 'react-calendar'
import './Home.css'
import './Calendar.css';
import moodColors from '../helpers/moodColors';
import { getTodaysMoodThunk } from '../store/singleMood';
import { getTodaysActivityThunk } from '../store/singleActivity';

export const Home = props => {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.id);
  const allMoods = useSelector(state => state.mood);
  let currentMood = useSelector(state => state.singleMood)
  const currentActivity = useSelector(state => state.singleActivity)
  const username = useSelector((state) => state.auth.username)

  const [color, setColor] = React.useState(currentMood.mood) || '';
  const [date, setDate] = React.useState(new Date().toISOString().slice(0, 10)) || '';

  useEffect(() => {
    dispatch(getTodaysMoodThunk(isLoggedIn))
    dispatch(getTodaysActivityThunk(isLoggedIn))
    setColor(currentMood?.mood)
  }, [isLoggedIn])

  const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const d = new Date();
  let day = date.slice(8,10);
  let name = month[date.slice(5,7) - 1];

  currentMood = allMoods.find(mood => mood.date === date)

  const DateContainer = () => {
    return (
      currentMood?.mood
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

  const moodCheck = (date) => {
    let isoDate = date.toISOString().slice(0, 10);
    for (let i = 0; i < allMoods.length; i++) {
      if (allMoods[i].date === isoDate) {
        return `${allMoods[i].mood}-calendar`
      }
    }
  }

  return (
    <div className='home-container'>
      <header className={`status-screen ${currentMood?.mood}-background`}>
        <DateContainer />
        <div className='mood-container'>
          <h1>{currentMood?.mood}</h1>
          {!currentMood?.description ? <p>No entry was added.</p> : <p>{currentMood?.description}</p>}
        </div>
      </header>
      <div className='calendar-screen'>
        <div className='calendar-container'>
          <Calendar
            calendarType="US"
            onChange={(date) => setDate(date.toISOString().slice(0, 10))}
            tileClassName={({ date }) => {
              return moodCheck(date);
            }}
          />
        </div>
      </div>
    </div>
  )
}




export default Home
