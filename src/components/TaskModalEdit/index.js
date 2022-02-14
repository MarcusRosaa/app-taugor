import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import {
  doc, updateDoc,
} from 'firebase/firestore';
import {
  getDownloadURL, getStorage, ref, uploadBytes,
} from 'firebase/storage';
import {
  Container, Input, Layer, Form, FormGroup, TextArea, Select,
} from './styles';
import useErrors from '../../hooks/useErrors';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';

export default function TaskModalEdit({ handleCloseModal, taskInfos, onChangeInfos }) {
  const [titleInput, setTitleInput] = useState(taskInfos.title);
  const descriptionInput = useRef('');
  const productInput = useRef('');
  const statusInput = useRef('');
  const priorityInput = useRef('');
  const problemInput = useRef('');
  const impactedUsersInput = useRef('');
  const [indexedDocumentInput, setIndexedDocumentInput] = useState(taskInfos.file);

  const { currentUser } = useAuth();

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = (
    titleInput
    && errors.length === 0
  );

  async function handleEdit(event) {
    event.preventDefault();

    const taskDocumentRef = doc(db, 'users', `${currentUser.uid}`, 'tasks', `${taskInfos.id}`);

    await updateDoc(taskDocumentRef, {
      title: titleInput || taskInfos.title,
      file: indexedDocumentInput || taskInfos.file,
      task_description: descriptionInput.current.value || '',
      product: productInput.current.value || '',
      status: statusInput.current.value || '',
      priority: priorityInput.current.value || '',
      problem_description: problemInput.current.value || '',
      impacted_users: impactedUsersInput.current.value || '',
    });

    await onChangeInfos();

    document.getElementById('editLayer').click(event);
  }

  async function handleIndexedDocumentChange(event) {
    const file = event.target.files[0];

    if (file) {
      const storage = getStorage();
      const filesStorageRef = ref(storage, `files/${event.target.files[0].name}`);

      await uploadBytes(filesStorageRef, file);
      setIndexedDocumentInput(await getDownloadURL(filesStorageRef));
    } else if (!file) {
      setIndexedDocumentInput(taskInfos.file);
    }
  }

  function handleTitleInputChange(event) {
    setTitleInput(event.target.value);
    const title = event.target.value;

    if (!title) {
      setError({ field: 'title', message: 'Nome é obrigatório.' });
    } else {
      removeError('title');
    }
  }

  return (
    <Layer onClick={handleCloseModal} className="modalLayer" id="editLayer">
      <Container>
        <Form onSubmit={handleEdit} noValidate>
          <FormGroup error={getErrorMessageByFieldName('title')}>
            <label htmlFor="title">Título *</label>
            <Input
              error={getErrorMessageByFieldName('title')}
              onChange={handleTitleInputChange}
              value={titleInput}
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
            <label htmlFor="problem">Descrição do problema</label>
            <Input
              name="problem"
              ref={problemInput}
              defaultValue={taskInfos.problem_description}
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

          <FormGroup>
            <label htmlFor="priority">Prioridade</label>
            <Select
              name="priority"
              ref={priorityInput}
              defaultValue={taskInfos.priority}
            >
              <option value="">Prioridade</option>
              <option value="alta">Alta</option>
              <option value="média">Média</option>
              <option value="baixa">Baixa</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <label htmlFor="status">Status da tarefa</label>
            <Select
              name="status"
              ref={statusInput}
              defaultValue={taskInfos.status}
            >
              <option value="pendente">Pendente</option>
              <option value="em andamento">Em andamento</option>
              <option value="finalizada">Finalizada</option>
              <option value="operação parada">Operação parada</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <label htmlFor="impacted_users">Usuários impactados</label>
            <Select
              name="impacted_users"
              ref={impactedUsersInput}
              defaultValue={taskInfos.impacted_users}
            >
              <option value="">Usuários impactados</option>
              <option value="apenas 1">Apenas 1</option>
              <option value="1 a 10 usuários">1 a 10 usuários</option>
              <option value="11 a 30 usuários">11 a 30 usuários</option>
              <option value="31 a 50 usuários">31 a 50 usuários</option>
              <option value="mais de 50 usuários">Mais de 50</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <label htmlFor="files">Troque de arquivo</label>
            <Input
              type="file"
              accept=".txt, .pdf"
              name="files"
              onChange={handleIndexedDocumentChange}
            />
          </FormGroup>

          <button type="submit" disabled={!isFormValid}>Confirmar edição</button>
        </Form>
      </Container>
    </Layer>
  );
}

TaskModalEdit.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  taskInfos: PropTypes.objectOf(PropTypes.any).isRequired,
  onChangeInfos: PropTypes.func.isRequired,
};
