import { PropTypes } from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/login" />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
