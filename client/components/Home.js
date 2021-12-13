import React from 'react'
import {useSelector} from 'react-redux'

/**
 * COMPONENT
 */
export const Home = props => {

  const username = useSelector((state) => state.auth.username)

  return (
    <div className='home-container'>
      <div className='home-screen'>
      <h3>Welcome, {username}</h3>
      </div>
    </div>
  )
}




export default Home
