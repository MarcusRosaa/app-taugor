import {
  Routes as Switch, Route,
} from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import UpdateProfile from './pages/UpdateProfile';

import { AuthProvider } from './contexts/AuthContext';

import PrivateRoute from './components/PrivateRoute';
import TaskForm from './components/TaskFrom';

export default function Routes() {
  return (
    <AuthProvider>
      <Switch>
        <Route
          path="*"
          element={<Login />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<Signup route="login" />}
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
        <Route
          path="/new-task"
          element={<PrivateRoute><TaskForm /></PrivateRoute>}
        />
      </Switch>
    </AuthProvider>
  );
}
