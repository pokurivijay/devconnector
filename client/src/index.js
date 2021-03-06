import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter as Router } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import jwt_decode from 'jwt-decode'

import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import { clearCurrentProfile } from './actions/profileActions'

import rooReducer from './reducers'
import middleware from './middleware'

//Check for token

const store = createStore(rooReducer, composeWithDevTools(middleware))

if (localStorage.jwtToken) {
  const localToken = localStorage.jwtToken
  setAuthToken(localToken)
  const decoded = jwt_decode(localToken)
  store.dispatch(setCurrentUser(decoded))

  // Automatic logout
  const currentTime = Date.now()/1000
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser())
    store.dispatch(clearCurrentProfile())
    window.location.href = '/login'
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
