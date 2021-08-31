import React from 'react'
import { Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Logout from './components/Logout'

const App = () => {
  return (
    <div>
      <Navbar />
      <Route exact path="/">
        <Home  />
      </Route>
      <Route   path="/about">
        <About/>
      </Route>
      <Route   path="/contact">
        <Contact />
      </Route>
      <Route   path="/signin">
        <Signin/>
      </Route>
      <Route  path="/signup">
        <Signup />
      </Route>
      <Route  path="/logout">
        <Logout />
      </Route>
    </div>
  )
}

export default App

