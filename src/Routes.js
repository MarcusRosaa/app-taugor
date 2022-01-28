import {
  Routes as Switch, Route, Navigate,
} from 'react-router-dom';

import { useEffect, useState } from 'react';

import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

export default function Routes() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storeUserState = localStorage.getItem('user');
    if (storeUserState) {
      JSON.parse(storeUserState);
      setUser(true);
      setUser(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('user', user);
  }, [user]);

  return (
    <Switch>
      {!user && (
        <Route
          path="/auth"
          element={<Auth handleAuthenticate={() => setUser(true)} />}
        />
      )}
      {user && (
        <>
          <Route
            path="/profile"
            element={<Profile handleLogout={() => setUser(false)} />}
          />
          <Route
            exact
            path="/dashboard"
            element={<Dashboard />}
          />
        </>
      )}

      <Route
        path="*"
        element={<Navigate to={user ? '/profile' : '/auth'} />}
      />
    </Switch>
  );
}
