import React, { useContext, useReducer } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'

import Context from './context'
import reducer from './reducer'
import apolloClient from './graphql/apolloClient'

import ProtectedRoute from './ProtectedRoute'
import App from './pages/App'
import Splash from './pages/Splash'

import 'mapbox-gl/dist/mapbox-gl.css'

const Root = () => {
  const initialState = useContext(Context)
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <Router>
      <ApolloProvider client={apolloClient}>
        <Context.Provider value={{ state, dispatch }}>
          <Switch>
            <ProtectedRoute exact path="/" component={App} />
            <Route path="/login" component={Splash} />
          </Switch>
        </Context.Provider>
      </ApolloProvider>
    </Router>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'))
