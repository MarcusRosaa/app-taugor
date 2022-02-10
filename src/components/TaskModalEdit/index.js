import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import {
  Container, Input, Layer, Form, FormGroup, TextArea,
} from './styles';

export default function TaskModalEdit({ closeModal, taskInfos }) {
  const titleInput = useRef(taskInfos.title);
  const descriptionInput = useRef('');
  const statusCategoryInput = useRef('');
  const productInput = useRef('');
  const priorityInput = useRef('');
  const problemInput = useRef('');
  const impactedUsersInput = useRef('');
  const [indexedDocumentInput, setIndexedDocumentInput] = useState('');

  const isFormValid = (
    titleInput
    && indexedDocumentInput
    && errors.length === 0
  );

  function handleEdit(event) {
    event.preventDefault();

    console.log(titleInput.current.value);
    console.log(descriptionInput.current.value);
  }

  return (
    <Layer onClick={closeModal} className="modalLayer">
      <Container>
        <Form onSubmit={handleEdit} noValidate>
          <FormGroup>
            <label htmlFor="title">Título *</label>
            <Input
              name="title"
              ref={titleInput}
              defaultValue={taskInfos.title}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="task_description">Descrição da tarefa</label>
            <TextArea
              name="task_description"
              ref={descriptionInput}
              defaultValue={taskInfos.task_description}
              rows="6"
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="product">Produto ou serviço afetado</label>
            <Input
              name="product"
              ref={productInput}
              defaultValue={taskInfos.product}
            />
          </FormGroup>

          <button type="submit" disabled={isFormValid}>Ediar</button>
        </Form>
      </Container>
    </Layer>
  );
}

TaskModalEdit.propTypes = {
  closeModal: PropTypes.func.isRequired,
  taskInfos: PropTypes.objectOf(PropTypes.any).isRequired,
};
