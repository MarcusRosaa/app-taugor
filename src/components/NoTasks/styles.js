import styled from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  height: 100%;
  margin: 0 auto;

  img {
    width: 100%;
    max-width: 100%;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  }

  h2 {
    text-align: center;
    margin: 24px 0px;
  }
`;
