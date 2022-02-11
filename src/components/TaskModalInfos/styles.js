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
  max-width: 900px;
  height: inherit;
  max-height: 450px;
  padding: 16px;
  top: 50%;
  left:50%;
  position:fixed;
  overflow-y:scroll;
  overflow-x:hidden;
  transform: translate(-50%, -50%);
  display: flex;

  border-radius: 8px;
  padding: 30px;
  margin-bottom: 16px;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    max-width: 800px;
  }

  @media (max-width: 880px) {
    max-width: 750px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 600px;
  }

  @media (max-width: 660px) {
    flex-direction: column;
    max-width: 450px;
  }

  @media (max-width: 545px) {
    max-width: 350px;
    overflow-y: auto;
  }

  @media (max-width: 375px) {
    max-width: 300px;
    overflow-y: auto;
  }
`;

export const Content = styled.div`
  width: 65%;
  padding-right: 20px;

  h5 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 5px;
  }

  p {
    font-size: 16px;
    font-weight: 300;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Title = styled.h2`
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 30px;
`;

export const Description = styled.div`
  margin-bottom: 20px;
`;

export const ProblemDescription = styled.div`
`;

export const Sidebar = styled.aside`
  width: 40%;
  height: fit-content;
  border: 1px solid rgb(180, 180, 180);
  border-radius: 8px;
  padding: 20px;


  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid rgb(180, 180, 180);

  &:last-of-type {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }

  div {
    height: fit-content;

    p {
      font-size: 14px;
      font-weight: 300;
    }
  }

  div:nth-of-type(1) {
    width: 35%;

    /* border: 1px solid blue; */

    p {
      font-size: 14px;
      font-weight: 600;
    }
  }

  div:nth-of-type(2) {
    width: 60%;
    padding-left: 15px;

    /* border: 1px solid orange; */

    a {
      text-decoration: none;
      color: #1565C0;
      display: flex;
      width: fit-content;
      text-align: center;
      font-size: 14px;
      font-weight: 300;
      padding: 8px 12px;
      border-radius: 8px;
      transition: .2s;

      color: black;
      background: rgb(230, 230, 230);

      &:hover {
        background: rgb(220, 220, 220);
      }
    }
  }
`;
