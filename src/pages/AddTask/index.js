import React from 'react';
import Header from '../../components/Header';
import AddTaskForm from '../../components/AddTaskForm';
import { FormContainer, Title } from './styles';

export default function AddTask() {
  return (
    <>
      <Header page="new-task" />
      <FormContainer>
        <Title>
          Cadastre uma nova tarefa
        </Title>
        <AddTaskForm />
      </FormContainer>
    </>

  );
}
