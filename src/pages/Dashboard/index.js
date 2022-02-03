import Header from '../../components/Header';
import DashboardHeader from '../../components/DashboardHeader';
import DashboardTable from '../../components/DashboardTable';

import { Container } from './styles';

export default function Dashboard() {
  return (
    <>
      <Header page="/" />
      <Container>
        <DashboardHeader />
        <DashboardTable />
      </Container>
    </>
  );
}
