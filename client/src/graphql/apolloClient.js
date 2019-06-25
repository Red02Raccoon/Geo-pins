import { ApolloClient } from 'apollo-client'
import { WebSocketLink } from 'apollo-link-ws'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { API_URL_WS } from '../constants'

const wsLink = new WebSocketLink({
  uri: API_URL_WS,
  options: {
    reconnect: true,
  },
})

export default new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache(),
})
