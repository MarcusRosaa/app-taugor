import PropTypes from 'prop-types';
import {
  Container, Description, Title, Layer,
} from './styles';

export default function TaskModal({ closeModal }) {
  return (
    <Layer onClick={closeModal} className="modalLayer">
      <Container>
        <Title>Título da tarefa que eu criei</Title>
        <Description>
          Descrição
          <p>
            descrição de uma tarefa pois tem que ser b
            em detalhado e
            algo bem grande para saber como vai ficar quando uma pesso
            a por varias sentenças
            e frases na descirçaoi esperando que alguem perca
            muitoo tempo lendo tuddo isso
            e mais um pouico ainda osbre tudo siiso
            q ela pode escrvee rçfdglkfdg
          </p>
        </Description>

      </Container>
    </Layer>
  );
}

TaskModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
