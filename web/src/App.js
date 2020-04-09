import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'
import PrivateRoute from './components/PrivateRoute'

import usePersistedState from './hooks/usePersistedState'

import Global from './styles/Global'

import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Dashboard from './components/pages/Dashboard'

function App() {
  const [logged, setLogged, removeLogged] = usePersistedState('logged', false)
  const [token, setToken, removeToken] = usePersistedState('token', null)

  function changeLogin(status, token = null) {
    if (status) {
      setLogged(true)
      setToken(token)
    }
    else {
      removeLogged()
      removeToken()
    }
  }

  return (
    <div className="App">
      <Global />
      <ToastProvider>
        <Router>
          <Switch>
            <Route path="/login">
              <Login changeLogin={changeLogin} auth={logged} />
            </Route>
            <Route path="/register">
              <Register changeLogin={changeLogin} auth={logged} />
            </Route>
            <PrivateRoute auth={logged} path="/" exact>
              <Dashboard auth={logged} />
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
