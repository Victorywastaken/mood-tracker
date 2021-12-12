import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import MobileDiv from './Mobile'
import Navbar from './components/Navbar'
import Routes from './Routes'
import { getMoodThunk } from './store/mood'
import { getTodaysMoodThunk } from "./store/singleMood";
import { getCategoriesThunk } from './store/activitiesCategory'
import { getActivitiesThunk } from './store/activities'
import { getTodaysActivityThunk } from './store/singleActivity'

const App = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.auth.id)
  const currentMood = useSelector(state => state.singleMood)
  const currentActivity = useSelector(state => state.singleActivity)

  useEffect(() => {
    dispatch(getMoodThunk(isLoggedIn))
    dispatch(getCategoriesThunk(isLoggedIn))
    dispatch(getActivitiesThunk(isLoggedIn))
    dispatch(getTodaysMoodThunk(isLoggedIn))
    dispatch(getTodaysActivityThunk(isLoggedIn))
  }, [isLoggedIn])
  return (

      <MobileDiv>
        <Navbar />
        <Routes currentMood={currentMood} currentActivity={currentActivity}/>
      </MobileDiv>

  )
}

export default App
