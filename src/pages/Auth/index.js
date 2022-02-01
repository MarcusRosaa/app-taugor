import PropTypes from 'prop-types';
import Login from '../../components/Login';
import SignUp from '../../components/Signup';

export default function Auth({ route }) {
  return (
    route === 'signup' ? <SignUp /> : <Login />
  );
}

Auth.propTypes = {
  route: PropTypes.string.isRequired,
};
