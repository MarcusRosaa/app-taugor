import Header from '../../components/Header';
import TasksFilter from '../../components/TasksFilter';
import TasksList from '../../components/TasksList';

import { Container } from './styles';

export default function Dashboard() {
  return (
    <>
      <Header page="/" />
      <Container>
        <TasksFilter />
        <TasksList />
      </Container>
    </>
  );
}
