import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'
import PrivateRoute from './components/PrivateRoute'

import Global from './styles/Global'

import Login from './components/pages/Login'
import Register from './components/pages/Register'

function App() {
  const [logged, setLogged] = useState(false)
  const [token, setToken] = useState(null)

  function changeLogin(status, token = null) {
    if (status) {
      setLogged(true)
      setToken(token)
    }
    else {
      setToken(null)
    }
  }

  return (
    <div className="App">
      <Global />
      <ToastProvider>
        <Router>
          <Switch>
            <Route path="/login">
              <Login changeLogin={changeLogin} />
            </Route>
            <Route path="/register">
              <Register changeLogin={changeLogin} />
            </Route>
            <PrivateRoute auth={logged} path="/" exact>
              Dashboard
            </PrivateRoute>
            <Route path="*">
              404
            </Route>
          </Switch>
        </Router>
      </ToastProvider>
    </div>
  )
}

export default App
