import React from 'react'
import {useSelector} from 'react-redux'
import Calendar from 'react-calendar'
import './Home.css'
import './Calendar.css';
import moodColors from '../helpers/moodColors';

/**
 * COMPONENT
 */
export const Home = props => {

  const username = useSelector((state) => state.auth.username)

  return (
    <div className='home-container'>
      <header className='status-screen'>
        <div className='date-container'>
          <h1 className='day'>12</h1>
          <p>DEC</p>
        </div>
        <div className='mood-container'>
          <h1>AWFUL</h1>
          <p>Your mood today was awful</p>
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
