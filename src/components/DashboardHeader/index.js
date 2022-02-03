import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

import {
  Container, HeaderFilters, InputSearchContainer, InputSelectContainer, OrderItemContainer,
} from './styles';

export default function DashboardHeader() {
  // const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('asc');

  function handleChangeSearchTerm() {}

  function handleToggleOrderBy() {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }

  return (
    <Container>
      <h2>Solicitações</h2>

      <HeaderFilters>
        <InputSearchContainer>
          <input
            // value={searchTerm}
            type="text"
            placeholder="Pesquisar tarefa..."
            onChange={handleChangeSearchTerm}
          />
          <SearchIcon />
        </InputSearchContainer>

        <InputSelectContainer>
          <select name="cars" id="cars">
            <option value="all" defaultValue>Tarefas</option>
            <option value="doing">Em andamento</option>
            <option value="done">Finalizada</option>
            <option value="todo">A fazer</option>
          </select>
        </InputSelectContainer>

        <OrderItemContainer orderBy={orderBy}>
          <button type="button" onClick={handleToggleOrderBy}>
            <span>Ordenar</span>
            <ArrowUpwardIcon />
          </button>
        </OrderItemContainer>
      </HeaderFilters>

    </Container>
  );
}
