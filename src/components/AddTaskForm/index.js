import { useRef } from 'react';
import { collection, addDoc } from 'firebase/firestore';

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
  const statusCategoryInput = useRef('todo');
  const productInput = useRef('');
  const priorityInput = useRef('');
  const problemInput = useRef('');
  const impactedUsersInput = useRef('');
  const indexedDocumentInput = useRef('');

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = (
    titleInput
    && statusCategoryInput
    && problemInput
    && indexedDocumentInput
    && errors.length === 0
  );

  function handleTitleChange(event) {
    console.log(titleInput.current.value);

    if (!event.target.value) {
      setError({ field: 'title', message: 'Título é obrigatório.' });
    } else {
      removeError('title');
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (titleInput !== '') {
      console.log('oi');
      await addDoc(collection(db, 'tasks'), {
        title: titleInput.current.value,
      });
    }
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('title')}>
        <Input
          ref={titleInput}
          error={getErrorMessageByFieldName('title')}
          placeholder="Título *"
          value={titleInput.current.value}
          onChange={handleTitleChange}
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
          <option value="todo">A fazer</option>
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

      <FormGroup>
        <label htmlFor="files">Selecione um arquivo .txt ou .pdf *</label>
        <FileInput
          type="file"
          accept=".txt, .pdf"
          ref={indexedDocumentInput.current.value}
          id="files"
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
