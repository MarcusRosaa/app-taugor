import { useNavigate } from 'react-router-dom';

export default function Auth({ handleAuthenticate }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    handleAuthenticate();
    navigate('profile');
  };

  return (
    <div>
      <h2>Por favor autentique-se para continuar</h2>
      <button type="button" onClick={handleLogin}>Autenticar</button>
    </div>
  );
}
