import styled, { css, keyframes } from 'styled-components';

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

  & ::-webkit-scrollbar {
    width: 7px;
  }

  /* Track */
  & ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #fafafa;
    border-radius: 6px;
  }

  /* Handle */
  & ::-webkit-scrollbar-thumb {
    background: #0006;
    border-radius: 10px;
  }

`;

export const Container = styled.div`
  width: 100%;
  max-width: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;

  overflow-y: auto;
  height: inherit;
  max-height: 600px;

  border-radius: 8px;
  padding: 30px;
  margin-bottom: 16px;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 680px) {
    max-width: 500px;
  }

  @media (max-width: 520px) {
    max-width: 300px;
  }
`;

export const Form = styled.form`
  border-radius: 8px;
  height: max-content;
  width: 100%;
  padding-right: 16px;
  padding: 16px;

  button {
    font-size: 16px;
    font-weight: 400;
    padding: 10px 16px;
    border-radius: 8px;
    transition: .2s;
    margin-top: 10px;
    float: right;

    border: none;
    color: #fff;
    background: #1C5EA8;

    &:hover {
      background: #256ec4;
    }

    &[disabled] {
      background: #ccc;
      cursor: default;
    }
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  label {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;

    ${({ error }) => error && css`
      color: #ef2b2a;
    `}
  }
`;

export const Input = styled.input`
  padding: 8px;
  border: none;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 300;

  background: rgb(250, 250, 250);
  border: 1px solid rgb(230, 230, 230);

  &:focus {
    border: 1px solid rgb(210, 210, 210);
    outline: none;
  }

  ${({ error }) => error && css`
    color: #ef2b2a;
    border-color: #ef2b2a;

    &:focus {
    border-color: #ef2b2a;
    }
  `}
`;

export const TextArea = styled.textarea`
  resize: none;
  border: none;
  padding: 8px;
  font-size: 15px;
  font-weight: 300;
  border-radius: 4px;

  background: rgb(250, 250, 250);
  border: 1px solid rgb(230, 230, 230);

  &:focus {
    border: 1px solid rgb(210, 210, 210);
    outline: none;
  }
`;

export const Select = styled.select`
  border: none;
  padding: 8px;
  font-size: 15px;
  font-weight: 300;
  border-radius: 4px;

  background: rgb(250, 250, 250);
  border: 1px solid rgb(230, 230, 230);

  &:focus {
    border: 1px solid rgb(210, 210, 210);
    outline: none;
  }
`;

export const FileInput = styled.input`
  ${({ error }) => error && css`
    color: #ef2b2a;
    border-color: #ef2b2a;

    &:focus {
    border-color: #ef2b2a;
    }
  `}
`;
