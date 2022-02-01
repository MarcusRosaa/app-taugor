import {
  Routes as Switch, Route,
} from 'react-router-dom';

import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

export default function Routes() {
  return (
    <AuthProvider>
      <Switch>
        <Route
          exact
          path="/"
          element={<PrivateRoute><Dashboard /></PrivateRoute>}
        />
        <Route
          path="/signup"
          element={<Auth route="signup" />}
        />
        <Route
          path="/login"
          element={<Auth route="login" />}
        />
        <Route
          path="/profile"
          element={<Profile />}
        />
      </Switch>
    </AuthProvider>
  );
}
