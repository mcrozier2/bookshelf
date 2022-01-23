/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import * as auth from 'auth-provider'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'
import { client } from 'utils/api-client.exercise'

function App() {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    async function getUser() {
      const token = await auth.getToken();
      if(token) {
        client('me', {token}).then(data => setUser(data.user));
      }
    }
    getUser();
  }, []);

  const login = form => auth.login(form).then(u => setUser(u));
  const register = form => auth.register(form).then(u => setUser(u));

  const logout = () => {
    auth.logout();
    setUser(null);
  }

  return user ? (
    <AuthenticatedApp user={user} logout={logout} /> 
  ) : (
    <UnauthenticatedApp login={login} register={register} />
  )
}

export {App}

