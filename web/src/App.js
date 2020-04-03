import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Login from './components/pages/Login'
import Global from './styles/Global'

function App() {
  const [logged, setLogged] = useState(false)

  return (
    <div className="App">
      <Global />
      <Router>
        <Switch>
          <Route path="/login">
            <Login changeLogin={setLogged} />
          </Route>
          <Route path="/register" />
          <Route path="/">
            { ! logged && <Redirect to="/login" /> }
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
