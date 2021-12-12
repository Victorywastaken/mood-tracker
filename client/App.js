import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import MobileDiv from './Mobile'
import Navbar from './components/Navbar'
import Routes from './Routes'
import { getMoodThunk } from './store/mood'
import { getCategoriesThunk } from './store/activitiesCategory'
import { getActivitiesThunk } from './store/activities'

const App = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.auth.id)

  useEffect(() => {
    dispatch(getMoodThunk(isLoggedIn))
    dispatch(getCategoriesThunk(isLoggedIn))
    dispatch(getActivitiesThunk(isLoggedIn))
  }, [isLoggedIn])
  return (

      <MobileDiv>
        <Navbar />
        <Routes />
      </MobileDiv>

  )
}

export default App
