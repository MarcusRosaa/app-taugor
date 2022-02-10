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
  max-width: 500px;
  border: 1px solid blue;
  border-radius: 8px;
  background: bisque;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;

  @media (max-width: 680px) {
    max-width: 500px;
  }

  @media (max-width: 520px) {
    max-width: 300px;
  }
`;

export const Form = styled.form`
  border-radius: 8px;
  width: 100%;
  padding-right: 16px;
  padding: 16px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  padding: 8px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  margin: 4px 0px 16px 0;

  &:focus {
    outline: none;
  }
`;

export const TextArea = styled.textarea`
  resize: none;
  border: none;
  padding: 8px;
  font-size: 14px;
  border-radius: 4px;


  &:focus {
    outline: none;
  }
`;
