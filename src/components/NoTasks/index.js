import NoTasksImage from '../../assets/images/noTasks.jpg';
import { Container } from './styles';

export default function NoTasks() {
  return (
    <Container>
      <h2>Nenhuma tarefa registrada</h2>
      <img src={NoTasksImage} alt="" />
    </Container>
  );
}
