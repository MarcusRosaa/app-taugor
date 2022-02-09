import {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
import PropTypes from 'prop-types';
import {
  doc, setDoc, getDoc,
} from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function signup(email, password) {
    await createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateEmailInfo(email) {
    return updateEmail(auth.currentUser, email);
  }

  function updatePasswordInfo(password) {
    return updatePassword(auth.currentUser, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (!currentUser) return;

      // Cria referencia para verificar se documento do user atual ja existe
      const currentUserDocumentRef = doc(db, 'users', currentUser?.uid);
      const documentSnap = await getDoc(currentUserDocumentRef);

      // Se documento não existir cria um com os dados do usuario atual
      // se existir nao faz nada, pois user ja tem documento gerado na coleçao
      // de usarios
      if (!documentSnap.exists()) {
        await setDoc(
          currentUserDocumentRef,
          {
            account_id: currentUser.uid,
          },
          { merge: true },
        );
      }

      // Se user logado, adicionar um user como document para a coleçao de 'users'

      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  const value = useMemo(() => ({
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmailInfo,
    updatePasswordInfo,
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
