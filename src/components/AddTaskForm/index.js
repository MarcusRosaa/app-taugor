import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  addDoc,
  collection,
  doc,
  updateDoc,
} from 'firebase/firestore';
import {
  getDownloadURL, getStorage, ref, uploadBytes,
} from 'firebase/storage';
import { db } from '../../firebase';

import { useAuth } from '../../contexts/AuthContext';

import { ButtonContainer, Form } from './styles';

import useErrors from '../../hooks/useErrors';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import AddTaskButton from '../AddTaskButton';
import TextArea from '../TextArea';
import FileInput from '../FileInput';

export default function AddTaskForm() {
  const titleInput = useRef('');
  const descriptionInput = useRef('');
  const statusCategoryInput = useRef('');
  const productInput = useRef('');
  const priorityInput = useRef('');
  const problemInput = useRef('');
  const impactedUsersInput = useRef('');
  const [indexedDocumentInput, setIndexedDocumentInput] = useState('');
  const { currentUser } = useAuth();
  const history = useNavigate();

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = (
    titleInput
    && indexedDocumentInput
    && errors.length === 0
  );

  async function handleIndexedDocumentChange(event) {
    const file = event.target.files[0];

    if (!file) {
      setError({ field: 'file', message: 'Adicione 1 arquivo.' });
    } else {
      const storage = getStorage();
      const filesStorageRef = ref(storage, `files/${event.target.files[0].name}`);

      removeError('file');

      await uploadBytes(filesStorageRef, file);
      setIndexedDocumentInput(await getDownloadURL(filesStorageRef));
    }
  }

  function handleTitleInputChange() {
    if (!titleInput.current.value) {
      setError({ field: 'title', message: 'Nome é obrigatório.' });
    } else {
      removeError('title');
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (titleInput.current.value && indexedDocumentInput) {
      const userID = currentUser.uid;
      const currentUserTasksDocumentRef = collection(db, 'users', `${userID}`, 'tasks');

      removeError('file');
      removeError('title');
      // adiciona uma nova task ao banco de dados
      const newTask = await addDoc(
        currentUserTasksDocumentRef,
        {
          title: titleInput.current.value,
          file: indexedDocumentInput,
          task_description: descriptionInput.current.value || '',
          product: productInput.current.value || '',
          status: statusCategoryInput.current.value || '',
          priority: priorityInput.current.value || '',
          problem_description: problemInput.current.value || '',
          impacted_users: impactedUsersInput.current.value || '',
        },
      );

      const newTaskDocumentID = newTask.id;
      const newTaskDocumentRef = doc(db, 'users', `${userID}`, 'tasks', `${newTaskDocumentID}`);
      await updateDoc(
        newTaskDocumentRef,
        {
          id: newTaskDocumentID,
        },
      );

      // redireciona para a home(dashboard)
      history('/', { replace: true });
    } else {
      setError({ field: 'file', message: 'Adicione 1 arquivo.' });
      setError({ field: 'title', message: 'Título é obrigatório.' });
    }
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('title')}>
        <Input
          onChange={handleTitleInputChange}
          ref={titleInput}
          error={getErrorMessageByFieldName('title')}
          placeholder="Título *"
        />
      </FormGroup>

      <FormGroup>
        <TextArea
          rows={4}
          ref={descriptionInput}
          type="text"
          placeholder="Descrição da tarefa"
        />
      </FormGroup>

      <FormGroup>
        <Input
          ref={productInput}
          type="text"
          placeholder="Produto ou serviço afetado"
        />
      </FormGroup>

      <FormGroup>
        <Select
          ref={statusCategoryInput}
          defaultValue="todo"
        >
          <option value="pendente">Pendente</option>
          <option value="em andamento">Em andamento</option>
          <option value="finalizada">Finalizada</option>
          <option value="operação parada">Operação parada</option>
        </Select>
      </FormGroup>

      <FormGroup>
        <Select
          ref={priorityInput}
          defaultValue=""
        >
          <option value="">Prioridade</option>
          <option value="alta">Alta</option>
          <option value="média">Média</option>
          <option value="baixa">Baixa</option>
        </Select>
      </FormGroup>

      <FormGroup>
        <Input
          ref={problemInput}
          type="text"
          placeholder="Descrição do problema"
        />
      </FormGroup>

      <FormGroup>
        <Select
          ref={impactedUsersInput}
          defaultValue=""
        >
          <option value="">Usuários impactados</option>
          <option value="apenas 1">Apenas 1</option>
          <option value="1 a 10 usuários">1 a 10 usuários</option>
          <option value="11 a 30 usuários">11 a 30 usuários</option>
          <option value="31 a 50 usuários">31 a 50 usuários</option>
          <option value="mais de 50 usuários">Mais de 50</option>
        </Select>
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('title')}>
        <label htmlFor="files">Selecione um arquivo .txt ou .pdf *</label>
        <FileInput
          error={getErrorMessageByFieldName('file')}
          type="file"
          accept=".txt, .pdf"
          id="files"
          onChange={handleIndexedDocumentChange}
        />
      </FormGroup>

      <ButtonContainer>
        <AddTaskButton type="submit" disabled={!isFormValid}>
          Criar tarefa
        </AddTaskButton>
      </ButtonContainer>
    </Form>
  );
}
