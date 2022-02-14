import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import {
  Container, HeaderFilters, InputSearchContainer, InputSelectContainer, OrderItemContainer,
} from './styles';

export default function TasksFilter({ onChangeOrderBy, onChangeTaskStatus }) {
  // const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('asc');

  function handleChangeSearchTerm() {}

  const handleToggleOrderBy = async () => {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  };

  const handleChangeStatus = async (event) => {
    onChangeTaskStatus(event.target.value);
  };

  useEffect(() => {
    onChangeOrderBy(orderBy);
  }, [orderBy]);

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
          <select name="status" id="status" onChange={handleChangeStatus}>
            <option value="all" defaultValue>Tarefas</option>
            <option value="pendente">Pendente</option>
            <option value="em andamento">Em andamento</option>
            <option value="finalizada">Finalizada</option>
            <option value="operação parada">Operação parada</option>
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

TasksFilter.propTypes = {
  onChangeOrderBy: PropTypes.func.isRequired,
  onChangeTaskStatus: PropTypes.func.isRequired,
};
