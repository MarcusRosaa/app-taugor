import { useEffect, useRef, useState } from 'react';

import {
  collection, addDoc, doc, getDoc,
} from 'firebase/firestore';
import {
  getDownloadURL, getStorage, ref, uploadBytes,
} from 'firebase/storage';
import { db } from '../../firebase';

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

    if (titleInput.current.value !== '' && indexedDocumentInput !== '') {
      await addDoc(collection(db, 'users'), {
        title: titleInput.current.value,
        file: indexedDocumentInput,
      });
    }
  }

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksRef = doc(db, 'users', 'user');
      const tasksSnap = await getDoc(tasksRef);

      if (tasksSnap.exists()) {
        console.log('Document data:', tasksSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    };
    fetchTasks();
  }, []);

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
          ref={descriptionInput.current.value}
          type="text"
          placeholder="Descrição da tarefa"
          value={descriptionInput.current.value}
        />
      </FormGroup>

      <FormGroup>
        <Input
          ref={productInput.current.value}
          type="text"
          placeholder="Produto ou serviço afetado"
          value={productInput.current.value}
        />
      </FormGroup>

      <FormGroup>
        <Select
          value={statusCategoryInput.current.value}
          ref={statusCategoryInput.current.value}
          defaultValue="todo"
        >
          <option value="todo">Pendente</option>
          <option value="doing">Em andamento</option>
          <option value="done">Fenalizada</option>
          <option value="stoped">Operação parada</option>
        </Select>
      </FormGroup>

      <FormGroup>
        <Select
          value={priorityInput.current.value}
          ref={priorityInput.current.value}
          defaultValue=""
        >
          <option value="">Prioridade</option>
          <option value="doing">Alta</option>
          <option value="done">Média</option>
          <option value="stoped">Baixa</option>
        </Select>
      </FormGroup>

      <FormGroup>
        <Input
          ref={problemInput.current.value}
          type="text"
          placeholder="Descrição do problema"
          value={problemInput.current.value}
        />
      </FormGroup>

      <FormGroup>
        <Select
          value={impactedUsersInput.current.value}
          ref={impactedUsersInput.current.value}
          defaultValue=""
        >
          <option value="">Usuários impactados</option>
          <option value="1">Apenas 1</option>
          <option value="10">1 a 10 usuários</option>
          <option value="30">11 a 30 usuários</option>
          <option value="50">31 a 50 usuários</option>
          <option value="51">Mais de 50</option>
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
