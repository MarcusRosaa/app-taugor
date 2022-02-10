import PropTypes from 'prop-types';
import {
  Container, Description, Title, Layer, Sidebar, Content,
} from './styles';

export default function TaskModalInfos({ closeModal, taskInfos }) {
  console.log(taskInfos);
  return (
    <Layer onClick={closeModal} className="modalLayer">
      <Container>
        <Content>
          <Title>{taskInfos.title}</Title>

          {taskInfos.task_description
          && (
          <Description>
            <h5>Descrição</h5>
            <p>
              {taskInfos.task_description}
            </p>
          </Description>
          )}
        </Content>

        <Sidebar>
          <a href={taskInfos.file}>clique</a>
        </Sidebar>
      </Container>
    </Layer>
  );
}

TaskModalInfos.propTypes = {
  closeModal: PropTypes.func.isRequired,
  taskInfos: PropTypes.objectOf(PropTypes.any).isRequired,
};
