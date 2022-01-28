import { Link } from 'react-router-dom';
import Header from '../../components/Header';

export default function Profile({ handleLogout }) {
  return (
    <>
      <Header />
      <div>
        <Link to="/dashboard">Dashboard</Link>
        <h1>Ola voce esta logado</h1>
        <button type="button" onClick={handleLogout}>Sair</button>
      </div>
    </>
  );
}
