import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Sora', sans-serif;
  }

  html, body {
    height: 100%;
  }

  body {
    font-size: 16px;
    background: ${({ theme }) => theme.backgroundColor};
  }

  body#layer {
    overflow: hidden;
  }

  body .modalLayer {
    height: 100%;
  }

  button {
    cursor: pointer;
  }

  a {
    color: #1565c0 !important;
  }

  a:visited{
    color: #1565c0 !important;
  }

  button a {
    text-decoration: none;
    color: #1565c0;
  }
`;
