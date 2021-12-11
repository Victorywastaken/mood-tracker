import React from 'react'
import MyWrapperComponent from './Mobile'
import Navbar from './components/Navbar'
import Routes from './Routes'

const App = () => {
  return (

      <MyWrapperComponent>
        <Navbar />
        <Routes />
      </MyWrapperComponent>

  )
}

export default App
