import styled, { css } from 'styled-components';

export default styled.input.attrs({
  type: 'file',
})`
  width: 100%;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border: 2px solid #fff;
  border-radius: 4px;
  outline: none;
  margin-top: 8px;
  font-size: 16px;
  transition: border-color 0.2s ease-in;

  &:focus {
    border-color: ${({ theme }) => theme.primaryColors.darkerGray};
  }

  ${({ error }) => error && css`
    color: #ef2b2a;
    border-color: #ef2b2a;

    &:focus {
    border-color: #ef2b2a;
    }
  `}
`;
