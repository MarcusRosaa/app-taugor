import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  & + & {
    margin-top: 16px;
  }

  small {
    color: #ef2b2a;
    font-size: 12px;
    display: block;
    margin-top: 8px;
  }
`;
