import styled, { css } from 'styled-components';

export default styled.button`
  height: 52px;
  border: none;
  padding: 0 16px;
  font-size: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  font-weight: bold;
  color: #fff;
  border-radius: 4px;
  background: #2676D2;
  transition: background 0.2s ease-in;

  &:hover {
    background: #3d87dc;
  }

  &:active {
    background: #185598;
  }

  &[disabled] {
    background: #ccc;
    cursor: default;
  }

  ${({ theme, danger }) => danger && css`
    background: #ef2b2a;

    &:hover {
      background: ${theme.primaryColors.darkerGray};
    }

    &:active {
      background: blue;
    }
  `}

`;
