import styled, { keyframes } from 'styled-components';

const ModalEffect = keyframes`
  0%   {opacity: 0}
  100% {opacity: 1}
`;

export const Layer = styled.div`
  position: fixed;
  float: left;
  left: 0;
  top: 0;
  width: 100vw;
  background: rgba(0,0,0,0.2);
  overflow: hidden;
  animation: ${ModalEffect} 0.3s ease-in;

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
  display: flex;

  @media (max-width: 850px) {
    max-width: 600px;
  }

  @media (max-width: 680px) {
    max-width: 500px;
  }

  @media (max-width: 520px) {
    max-width: 300px;
  }
`;

export const Title = styled.h2`

`;

export const Description = styled.div`

`;

export const Content = styled.div`
  width: 70%;
  padding-right: 16px;
`;

export const Sidebar = styled.aside`
  width: 30%;
  border: 1px solid;
  padding: 8px;
  background: red;
`;
