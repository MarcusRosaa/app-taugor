import {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import {
  createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut,
} from 'firebase/auth';
import PropTypes from 'prop-types';
import { auth } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = useMemo(() => ({
    currentUser,
    login,
    signup,
    logout,
  }), [currentUser]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children }
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
