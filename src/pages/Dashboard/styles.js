import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 24px;
`;

export const TasksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 32px;

  & > :nth-child(1n) {
    margin-right: 16px;
  }

  & > :nth-child(4n) {
    margin-right: 0;
  }

  @media only screen and (max-width: 1200px) {
    & > :nth-child(1n) {
      margin-right: 16px;
    }

    & > :nth-child(3n) {
      margin-right: 0;
    }
  }

  @media only screen and (max-width: 768px) {
    & > :nth-child(1n) {
      margin-right: 0;
      margin-left: 0;
    }
  }
`;

export const Card = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: calc(25% - 12px);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  & .card_problem_description {
    margin-top: 10px;
  }

  @media only screen and (max-width: 1200px) {
    width: calc(33.333% - 11px);
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const CardHeader = styled.header`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;

  & .card_icon__edit {
    fill: #0e52d7;
    margin-left: 8px;
  }

  & .card_icon__delete {
    fill: #d11414;
    margin-left: 8px;
  }
`;

export const ProgressStatus = styled.span`
  text-transform: uppercase;
  padding: 8px;
  margin-right: auto;
  border-radius: 8px;
  border: 1px dashed;
  color: ${({ progress }) => {
    if (progress === 'pendente') { return '#0e52d7'; }
    if (progress === 'em andamento') { return '#f7be22'; }
    if (progress === 'finalizada') return '#199a1f';
    if (progress === 'operação parada') return '#d11414';
  }}
`;

export const CardTitle = styled.h3`
  width: 100%;
  margin-top: 12px;
`;

export const Priority = styled.div`
  width: ${({ priority }) => (priority === 'média' ? '20px' : '32px')};
  margin-top: 10px;

  img {
    width: 100%;
    object-fit: contain;
    filter: ${({ priority }) => {
    if (priority === 'alta') {
      return 'invert(23%) sepia(96%) saturate(3974%) hue-rotate(352deg) brightness(82%) contrast(101%)';
    }
    if (priority === 'média') {
      return 'invert(81%) sepia(20%) saturate(2411%) hue-rotate(342deg) brightness(106%) contrast(94%)';
    }
    if (priority === 'baixa') {
      return 'invert(39%) sepia(97%) saturate(732%) hue-rotate(82deg) brightness(91%) contrast(89%)';
    }
  }};
  transform:  ${({ priority }) => (priority === 'baixa' ? 'rotate(180deg)' : 'rotate(0)')}};
`;
