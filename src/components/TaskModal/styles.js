import styled from 'styled-components';

export const Layer = styled.div`
  position: fixed;
  float: left;
  left: 0;
  top: 0;
  width: 100vw;
  background: rgba(0,0,0,0.2);
  overflow: hidden;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 16px;
  border: 1px solid blue;
  background: bisque;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  transition: background 4s ease-in;
`;

export const Title = styled.h3`

`;

export const Description = styled.div`

`;
