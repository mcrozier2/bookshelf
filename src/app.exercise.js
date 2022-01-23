/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import * as auth from 'auth-provider'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'
import { client } from 'utils/api-client.exercise'
import {useAsync} from 'utils/hooks';
import { FullPageSpinner } from 'components/lib';
import * as colors from 'styles/colors';

function App() {
  const {data: user, error, run, isIdle, isLoading, isError, isSuccess, setData} = useAsync();

  React.useEffect(() => {
    async function getUser() {
      const token = await auth.getToken();
      if(token) {
        const data = await client('me', {token});
        return data.user;
      }
    }
    run(getUser());
  }, [run]);

  const login = form => auth.login(form).then(u => setData(u));
  const register = form => auth.register(form).then(u => setData(u));

  const logout = () => {
    auth.logout();
    setData(null);
  }

  if(isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if(isError) {
    return (
      <div
        css={{
          color: colors.danger,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>Uh oh... There's a problem. Try refreshing the app.</p>
        <pre>{error.message}</pre>
      </div>
    )
  }

  if(isSuccess) {
    return user ? <AuthenticatedApp user={user} logout={logout} /> : <UnauthenticatedApp login={login} register={register} />;
  }
}

export {App}

