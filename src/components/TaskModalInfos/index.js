import PropTypes from 'prop-types';
import {
  Container, Description, Title, Layer, Sidebar, Content, ProblemDescription, SidebarItem,
} from './styles';

export default function TaskModalInfos({ closeModal, taskInfos }) {
  return (
    <Layer onClick={closeModal} className="modalLayer">
      <Container>
        <Content>
          <Title>{taskInfos.title}</Title>

          <Description>
            <h5>Descrição</h5>
            <p>{taskInfos.task_description}</p>
          </Description>

          <ProblemDescription>
            <h5>Descrição do problema</h5>
            <p>{taskInfos.problem_description}</p>
          </ProblemDescription>
        </Content>

        <Sidebar>
          <SidebarItem>
            <div>
              <p>Produto</p>
            </div>
            <div>
              <p>{taskInfos.product ? taskInfos.product : 'Não informado'}</p>
            </div>
          </SidebarItem>

          <SidebarItem>
            <div>
              <p>Status</p>
            </div>
            <div>
              <p>{taskInfos.status}</p>
            </div>
          </SidebarItem>

          <SidebarItem>
            <div>
              <p>Prioridade</p>
            </div>
            <div>
              <p>{taskInfos.priority ? taskInfos.priority : 'Não informada'}</p>
            </div>
          </SidebarItem>

          <SidebarItem>
            <div>
              <p>Usuários impactados</p>
            </div>
            <div>
              <p>{taskInfos.impacted_users ? taskInfos.impacted_users : 'Nenhuma informação'}</p>
            </div>
          </SidebarItem>

          <SidebarItem>
            <div>
              <p>Arquivo</p>
            </div>
            <div>
              <a href={taskInfos.file} target="_blank" rel="noreferrer">Acessar</a>
            </div>
          </SidebarItem>
        </Sidebar>
      </Container>
    </Layer>
  );
}

TaskModalInfos.propTypes = {
  closeModal: PropTypes.func.isRequired,
  taskInfos: PropTypes.objectOf(PropTypes.any).isRequired,
};
