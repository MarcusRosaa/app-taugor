import {
  Routes as Switch, Route,
} from 'react-router-dom';

import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import UpdateProfile from './pages/UpdateProfile';

export default function Routes() {
  return (
    <AuthProvider>
      <Switch>
        <Route
          path="/signup"
          element={<Auth route="signup" />}
        />
        <Route
          path="/login"
          element={<Auth route="login" />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        <Route
          exact
          path="/"
          element={<PrivateRoute><Dashboard /></PrivateRoute>}
        />
        <Route
          path="/profile"
          element={<PrivateRoute><Profile /></PrivateRoute>}
        />
        <Route
          path="/update-profile"
          element={<PrivateRoute><UpdateProfile /></PrivateRoute>}
        />
      </Switch>
    </AuthProvider>
  );
}
