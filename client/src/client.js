import { useState, useEffect } from 'react'
import { GraphQLClient } from 'graphql-request'

import { API_URL } from './constants'

export const useClient = () => {
  const [idToken, setIdToken] = useState('')

  useEffect(() => {
    const token = window.gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getAuthResponse().id_token

    setIdToken(token)
  }, [])

  return new GraphQLClient(API_URL, {
    headers: {
      authorization: idToken,
    },
  })
}
