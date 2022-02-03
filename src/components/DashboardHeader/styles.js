import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  padding-bottom: 16px;
  border: 1px solid ${({ theme }) => theme.primaryColors.lightGray};
  border-radius: 8px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

  & h2 {
    font-weight: 400;
    font-size: 24px;
    color: ${({ theme }) => theme.primaryColors.darkGray};
    margin:  16px 0 16px 0;
    padding-left: 16px;
  }
`;

export const HeaderFilters = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 16px 0px 16px;


  @media only screen and (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const InputSearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.primaryColors.darkGray};
  border-radius: 4px;
  background: #fff;
  padding: 1px;

  & input {
    border: none;
    padding: 8px;

    &:focus {
      outline: none;
    }
  }

  & svg {
    color: ${({ theme }) => theme.primaryColors.darkGray};
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    margin-bottom: 16px;

    & input {
      width: 100%;
    }
  }
`;

export const InputSelectContainer = styled.div`

  margin-left: 16px;
  & select {
    border: 1px solid ${({ theme }) => theme.primaryColors.darkGray};
    background: #fff;
    border-radius: 4px;
    padding: 8px;
    color: ${({ theme }) => theme.primaryColors.darkerGray};

    &:focus {
      outline: none;
    }
  }

  @media only screen and (max-width: 768px) {
    width: 50%;
    margin-left: 0;
  }
`;

export const OrderItemContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-self: flex-end;
  width: 100%;
  padding-right: 16px;

  & button {
    border: none;
    background: none;
    display: flex;
    align-items: center;

    & span {
      font-size: 16px;
      color: ${({ theme }) => theme.primaryColors.darkGray};
    }

    & svg {
      color: ${({ theme }) => theme.primaryColors.darkGray};
      width: 24px;
      transform: ${({ orderBy }) => (orderBy === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)')};
      transition: transform 0.2s ease-in;
    }
  }

  @media only screen and (max-width: 768px) {
    width: 50%;
    padding-right: 0;


    & input {
      width: 100%;
    }
  }
`;
