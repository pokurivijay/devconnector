import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'

import PrivateRoute from './common/PrivateRoute'

import NavBar from './layout/Navbar'
import Landing from './layout/Landing'
import Register from './auth/Register'
import CreateProfile from './dashboard/CreateProfile'
import EditProfile from './dashboard/EditProfile'
import Dashboard from './dashboard/Dashboard'
import AddExperience from './dashboard/AddExperience'
import AddEducation from './dashboard/AddEducation'
import Profiles from './profiles/Profiles'
import Profile from './profiles/Profile'
import Login from './auth/Login'
import Footer from './layout/Footer'
import NotFound from './common/NotFound'
import Posts from './posts/Posts'
import Post from './posts/Post'

import '../styles/reset.css'
import '../styles/style.css'
import '../styles/auth.css'
import '../styles/table.css'
import '../styles/dashboard.css'
import '../styles/profile.css'
import '../styles/post.css'
import '../styles/form.css'

class App extends React.Component {

  render() {
    return (
      <Fragment>
        <NavBar />
          <Switch>
            <Route exact path='/' component={Landing}/>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/profiles' component={Profiles}/>
            <Route exact path='/profiles/:handle' component={Profile}/>
            <Route exact path='/not-found' component={NotFound}/>
            <PrivateRoute exact path='/dashboard' component={Dashboard}/>
            <PrivateRoute exact path='/create-profile' component={CreateProfile}/>
            <PrivateRoute exact path='/edit-profile' component={EditProfile}/>
            <PrivateRoute exact path='/add-experience' component={AddExperience}/>
            <PrivateRoute exact path='/add-education' component={AddEducation}/>
            <PrivateRoute exact path='/feed' component={Posts}/>
            <PrivateRoute exact path='/post/:id' component={Post}/>
          </Switch>
        <Footer />
      </Fragment>
    )
  }
}

export default App
